/* eslint-disable @typescript-eslint/no-unnecessary-condition */
type Environment = 'production' | 'testing' | 'development';

/**
 * Get/assert the current environment.
 */
export default function environment(): Environment;
export default function environment(env: Environment): boolean;
export default function environment(env?: Environment): boolean | Environment {
    const environment: Environment = process.env.NODE_ENV as Environment ??
        (globalThis?.window?.hasOwnProperty('Cypress') ? 'testing' : process.dev ? 'development' : 'production');

    if (!env) {
        return environment;
    }

    return environment === env;
}
