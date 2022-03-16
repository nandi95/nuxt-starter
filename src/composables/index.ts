import { inject } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { Configuration } from '@upfrontjs/framework';
import { API, ApiResponseHandler, GlobalConfig } from '@upfrontjs/framework';
import User, { isAuthenticated } from '~/upfront/models/User';
import ErrorHandler from '~/utils/ErrorHandler';
import type { LoaderMethods } from '~/types';

// This in fact returns the instancetype of the Loader component
export const loaderKey: InjectionKey<Ref<LoaderMethods>> = Symbol('loader');

export const useLoader = (): LoaderMethods | undefined => {
    return inject(loaderKey)?.value;
};

type Environment = 'production' | 'testing' | 'development';

export function environment(): Environment;
export function environment(env: Environment): boolean;
export function environment(env?: Environment): boolean | Environment {
    const environment: Environment = process.env.NODE_ENV as Environment ??
        (window?.hasOwnProperty('Cypress')
            ? 'testing'
            : process.dev ? 'development' : 'production');

    if (!env) {
        return environment;
    }

    return environment === env;
}

export const config: GlobalConfig<Configuration & { headers: Headers }> = new GlobalConfig({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new Headers({ 'X-Requested-With': 'UpfrontJS' }),
    api: class APIWithCredentials extends API {
        requestOptions: Partial<RequestInit> = {
            credentials: 'include'
        };
    },
    apiResponseHandler: class ApiResponseHandlerWithErrorHandling extends ApiResponseHandler {
        public async handleError(rejectReason: Response): Promise<never> {
            const errorHandler = new ErrorHandler(rejectReason);

            if (errorHandler.authenticationError()) {
                isAuthenticated.value = false;
                await User.logout();
                return Promise.reject(rejectReason);
            }

            return super.handleError(rejectReason);
        }
    }
});

export const setCookie = (): void => {
    if (document.cookie) {
        const match = /(.*?)=((.*?)[;,]|.*$)/.exec(document.cookie);
        const token = match ? match[2] : null;

        if (token) {
            config.get('headers').set('X-XSRF-TOKEN', decodeURIComponent(token));
        }
    }
};
