import { Model } from '@upfrontjs/framework';
import { isAuthenticated, user } from '~/composables';
import ErrorHandler from '~/utils/ErrorHandler';

export default class User extends Model {
    name?: string;
    email?: string;

    get fillable(): string[] {
        return ['name', 'email'];
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
            const user = await this.current();
            return user!;
        }

        const userInstance = new this();

        // get the cookie for the browser
        await userInstance.setEndpoint('csrf-cookie').call('get');

        // log in & create the session
        return await userInstance.setEndpoint('login')
            .call('post', { email, password, remember })
            .then(async () => {
                user.value = await this.get() as User;
                isAuthenticated.value = true;

                return user.value;
            });
    }

    /**
     * Get the currently logged in user.
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
        if (!isAuthenticated.value) {
            user.value = null;
            return;
        }

        await user.value!.setEndpoint('logout')
            .post({})
            .then(() => {
                // expecting the back-end to unset the cookie
                isAuthenticated.value = false;
                user.value = null;
            })
            .catch(errorResponse => {
                const handler = new ErrorHandler(errorResponse);

                // we're already logged out
                if (handler.isUnauthenticatedError()) {
                    user.value = null;
                    isAuthenticated.value = false;
                    return;
                }

                throw errorResponse;
            });
    }
}
