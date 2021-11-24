import { defineNuxtPlugin } from '#app';
import type { Router } from 'vue-router';

export default defineNuxtPlugin(nuxt => {
    const router = nuxt.$router as Router;

    // casting to type until this resolves https://github.com/nuxt/framework/issues/1794
    router.options.scrollBehavior = (to, _from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        }

        const position: Record<string, number | string> = {
            top: 0,
            behavior: 'smooth'
        };

        if (to.hash) {
            position.selector = to.hash;
        }

        return position;
    };
});
