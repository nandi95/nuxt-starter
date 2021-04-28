import type { Plugin } from '@nuxt/types';

const routeNames = {
    index: 'index'
} as const;

declare module 'vue/types/vue' {
    interface Vue {
        $routeNames: typeof routeNames;
    }
}

const plugin: Plugin = (_ctx, inject) => {
    inject('routeNames', routeNames);
};

export default plugin;
