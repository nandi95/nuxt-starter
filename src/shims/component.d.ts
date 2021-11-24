declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $isAuthenticated: boolean;
    }

    interface ComponentCustomOptions {
        /**
         * Specify which layout the page component should use.
         */
        layout?: 'admin' | 'default';
    }
}

export {};
