import { defineNuxtPlugin } from '#app';
import type { Router } from 'vue-router';
import { isAuthenticated, user } from '~/composables';
import User from '~/models/User';
import { watch } from 'vue';

export default defineNuxtPlugin(async nuxt => {
    if (!document.cookie) {
        isAuthenticated.value = false;
        user.value = null;
    }

    if (document.cookie && !isAuthenticated.value) {
        try {
            // attempt to get the user, in case the local copy got deleted
            user.value = await User.get() as User;
            isAuthenticated.value = true;
        } catch (e: unknown) {}
    }

    nuxt.vueApp.config.globalProperties.$isAuthenticated = isAuthenticated.value;
    watch(isAuthenticated, newValue => nuxt.vueApp.config.globalProperties.$isAuthenticated = newValue);

    (nuxt.$router as Router).beforeEach((to, from, next) => {
        if (to.path.startsWith('/admin') && !isAuthenticated.value) {
            localStorage.setItem('initialTarget', JSON.stringify(to));
            return next({ path: 'login' });
        }

        return next();
    });
});
