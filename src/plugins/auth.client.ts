import { defineNuxtPlugin } from '#app';
import type { Router } from 'vue-router';
import { config, setCookie } from '~/composables';
import User, { isAuthenticated, user } from '~/upfront/models/User';
import { watch } from 'vue';

export default defineNuxtPlugin(async nuxt => {
    const router: Router = nuxt.$router;

    if (document.cookie) {
        if (!config.get('headers').has('X-XSRF-TOKEN')) {
            setCookie();
        }

        if (!isAuthenticated.value) {
            // attempt to get the user, in case the local copy got deleted
            await User.get()
                .then(userModel => {
                    isAuthenticated.value = true;
                    user.value = userModel as User;
                })
                .catch(() => {
                    document.cookie = '';
                });
        }
    } else if (isAuthenticated.value) {
        // if still logged in but token got lost; try to obtain again
        await new User().setEndpoint('csrf-cookie')
            .call('get')
            .then(setCookie)
            // ensure we have the user
            .then(async () => await User.current(true))
            .catch(async () => {
                isAuthenticated.value = false;
                return User.logout();
            });
    }

    watch(
        () => isAuthenticated.value,
        newValue => nuxt.vueApp.config.globalProperties.$isAuthenticated = newValue,
        { immediate: true }
    );

    router.beforeEach((to, from, next) => {
        if (isAuthenticated.value) {
            if (to.path === '/login') {
                return next({ path: '/admin' });
            }

            return next();
        }

        if (to.path.startsWith('/admin')) {
            if (to.path !== '/admin') {
                localStorage.setItem('initialTarget', JSON.stringify(to));
            }

            return next({ path: '/login' });
        }

        return next();
    });
});
