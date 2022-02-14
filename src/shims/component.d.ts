import type { Ref } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $isAuthenticated: Ref<boolean>;
    }

    interface ComponentCustomOptions {
        /**
         * Specify which layout the page component should use.
         */
        layout?: 'admin' | 'default';
    }
}

export {};
