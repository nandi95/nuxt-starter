import type { ToastPluginAPI } from 'vue-toastify';
import type { HookResult } from '@nuxt/schema';
import type { UserAttributes } from '~/types/index';

declare module '#app' {
    interface RuntimeNuxtHooks {
        /* eslint-disable @typescript-eslint/naming-convention */
        'user:login': (user: UserAttributes) => HookResult;
        'user:logout': () => HookResult;
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    interface NuxtApp {
        $toast: ToastPluginAPI;
    }
}

export {};
