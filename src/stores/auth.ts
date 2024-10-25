import type { UserAttributes } from '~/types';
import { skipHydrate } from 'pinia';

export const useAuthStore = defineStore('auth',  () => {
    const config = useRuntimeConfig();
    const nuxtApp = useNuxtApp();

    const user = ref({} as UserAttributes);
    const token = useCookie('lashbrill-token', {
        sameSite: 'strict',
        secure: config.public.apiBase.startsWith('https://'),
        maxAge: 60 * 60 * 24 * 30
    });

    const loggedIn = computed(() => !!token.value);
    const userLoaded = computed(() => !!Object.keys(user.value).length);

    if (import.meta.client) {
        watchEffect(() => {
            if (loggedIn.value && userLoaded.value && user.value.roles.includes('admin')) {
                localStorage.setItem('umami.disabled', '1');
            } else {
                localStorage.removeItem('umami.disabled');
            }
        });
    }

    const logout = async () => $fetch('logout', { method: 'POST' })
        .then(async () => {
            token.value = '';
            user.value = {} as UserAttributes;

            return nuxtApp.runWithContext(() => {
                useToast().success('You have logged out!');
            });
        });

    const fetchUser = async () => {
        if (!loggedIn.value) {
            throw new Error('User is not logged in');
        }

        return $fetch<{ data: UserAttributes}>('user', { cache: 'no-cache' })
            .then(({ data }) => user.value = data);
    };

    return {
        config,
        nuxtApp,
        user,
        loggedIn,
        logout,
        fetchUser,
        // cookie gets removed on the following pages contact, landing, privacy, about
        // on hydration; this only hides the problem for now
        token: skipHydrate(token),
        userLoaded
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
