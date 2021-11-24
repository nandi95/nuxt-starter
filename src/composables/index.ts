import { customRef, inject, ref } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type Loader from '~/components/Loader.vue';
import type { Configuration } from '@upfrontjs/framework';
import { API, GlobalConfig } from '@upfrontjs/framework';
import User from '~/models/User';

export const loaderKey: InjectionKey<Ref<InstanceType<typeof Loader>>> = Symbol('loader');

export const useLoader = (): InstanceType<typeof Loader> | undefined => {
    return inject(loaderKey)?.value;
};

type Environment = 'production' | 'testing' | 'development';

export function environment(): Environment;
export function environment(env: Environment): boolean;
export function environment(env?: Environment): boolean | Environment {
    const environment: Environment = process.env.NODE_ENV as Environment ??
        (window?.hasOwnProperty('Cypress') ? 'testing' : process.dev ? 'development' : 'production');

    if (!env) {
        return environment;
    }

    return environment === env;
}

export const config: GlobalConfig<Configuration & { headers: Headers }> = new GlobalConfig({
    headers: new Headers(),
    api: class APIWithCredentials extends API {
        initRequest(): Partial<RequestInit> {
            const request: Partial<RequestInit> = {
                credentials: 'include'
            };

            if (document.cookie) {
                const match = /(.*?)=((.*?)[;,]|.*$)/.exec(document.cookie);
                const token = match ? match[2] : null;

                if (token) {
                    request.headers = {
                        'X-XSRF-TOKEN': decodeURIComponent(token)
                    };
                }
            }

            return request;
        }
    }
});

function userRef() {
    return customRef((track, trigger) => {
        return {
            get: () => {
                track();
                const user = localStorage.getItem('user');

                if (!user) {
                    return null;
                }

                return new User(JSON.parse(user) as ReturnType<typeof User.prototype.getRawAttributes>);
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

export const user = process.server ? { value: null } : userRef();
export const isAuthenticated = ref(!!user.value);
