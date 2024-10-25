import type { UserProvider } from '~/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useOAuth() {
    const config = useRuntimeConfig();
    const auth = useAuthStore();

    const userProviderLoadingState = ref<Record<UserProvider, boolean>>({
        google: false,
        facebook: false
    });

    interface CBData {
        ok: boolean;
        provider: UserProvider;
        token?: string;
        message?: string;
    }

    async function handleMessage(event: { data: CBData }): Promise<void> {
        const provider = event.data.provider;

        if (Object.keys(userProviderLoadingState.value).includes(provider) && event.data.token) {
            auth.token = event.data.token;

            await auth.fetchUser();
            await navigateTo(new URLSearchParams(window.location.search).get('redirect') ?? '/');
        } else if (event.data.message) {
            useToast().error(event.data.message);
        }
    }

    function loginVia(provider: UserProvider): void {
        userProviderLoadingState.value[provider] = true;

        const width = 640;
        const height = 660;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            `${config.public.apiBase}/oauth/${provider}/redirect`,
            'Sign In',
            // eslint-disable-next-line max-len,@typescript-eslint/restrict-template-expressions
            `popup=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scollbars=no, resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`
        );

        const interval = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(interval);
                userProviderLoadingState.value[provider] = false;
            }
        }, 500);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onMounted(() => { window.addEventListener('message', handleMessage); });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onBeforeUnmount(() => { window.removeEventListener('message', handleMessage); });

    return {
        loginVia,
        userProviderLoadingState
    };
}
