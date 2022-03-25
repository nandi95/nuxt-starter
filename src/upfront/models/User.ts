import ErrorHandler from '~/utils/ErrorHandler';
import UserFactory from '../factories/UserFactory';
import Model from './Model';
import { customRef, ref } from 'vue';
import { config, setCookie } from '~/composables';

export default class User extends Model {
    public name?: string;
    public email?: string;

    public override getName(): string {
        return 'User';
    }

    public readonly timestamps = false;
    public readonly softDeletes = false;

    public factory(): UserFactory {
        return new UserFactory();
    }

    /**
     * Log the user into the application.
     *
     * @param {string} email
     * @param {string} password
     * @param {boolean} remember
     */
    public static async login(email: string, password: string, remember = false): Promise<User> {
        if (isAuthenticated.value) {
            return (await this.current())!;
        }

        const userInstance = new this();

        if (!config.get('headers').has('X-XSRF-TOKEN')) {
            // get the cookie for the browser
            await userInstance.setEndpoint('csrf-cookie')
                .call('get')
                .then(() => {
                    if (!setCookie()) {
                        throw new Error('Unable set cookie.');
                    }
                }).catch(console.error);
        }

        // log in & create the session
        return await userInstance.setEndpoint('login')
            .post({ email, password, remember })
            .then(async returnUser => {
                isAuthenticated.value = true;
                user.value = returnUser.exists ? returnUser : await this.get() as User;

                return user.value;
            });
    }

    /**
     * Get the currently logged-in user.
     */
    public static async current(refresh = false): Promise<User | null> {
        if (!isAuthenticated.value) {
            return null;
        }

        if (!user.value || refresh) {
            user.value = await this.get() as User;
        }

        return user.value;
    }

    /**
     * Log out this user from the application.
     */
    public static async logout(): Promise<void> {
        const resetLocal = () => {
            if (isAuthenticated.value) {
                isAuthenticated.value = false;
            }

            user.value = null;
            document.cookie = '';
            config.get('headers').delete('X-XSRF-TOKEN');
        };

        if (!isAuthenticated.value) {
            resetLocal();
            return;
        }

        await user.value!.setEndpoint('logout')
            .post({})
            .then(resetLocal)
            .catch(errorResponse => {
                const handler = new ErrorHandler(errorResponse);

                // we're already logged out
                if (handler.authenticationError()) {
                    resetLocal();
                    return;
                }

                throw errorResponse;
            });
    }
}

function userRef() {
    return customRef((track, trigger) => {
        return {
            get: (): User | null => {
                track();
                const user = localStorage.getItem('user');

                if (!user) {
                    return null;
                }

                return User.create(JSON.parse(user) as ReturnType<typeof User.prototype.getRawAttributes>);
            },
            set: (user: User | null) => {
                trigger();
                if (user === null) {
                    localStorage.removeItem('user');
                    return;
                }

                localStorage.setItem('user', JSON.stringify(user.getRawAttributes()));
            }
        };
    });
}

export const user = process.server ? ref(null) : userRef();
export const isAuthenticated = ref(!!user.value);
