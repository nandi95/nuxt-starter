<template>
    <div class="relative w-screen h-screen bg-slate-200 dark:bg-gray-700">
        <Loader ref="loader" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { useMeta } from '#meta';
import meta from '~/composables/meta';
import Loader from '~/components/Loader.vue';
import { loaderKey } from '~/composables';
import { useNuxtApp } from '#app';

export default defineComponent({
    name: 'App',

    components: { Loader },

    setup: () => {
        useMeta(meta);
        const loader = ref<InstanceType<typeof Loader>>();
        const nuxtApp = useNuxtApp();
        // @ts-expect-error
        provide(loaderKey, loader);

        // todo - move this into a module using a hook
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const setting = localStorage.getItem('color-schema') ?? 'auto';
        // eslint-disable-next-line no-mixed-operators
        if (setting === 'dark' || prefersDark && setting !== 'light') {
            document.documentElement.classList.toggle('dark', true);
        }

        nuxtApp.hook('page:start', () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            loader.value?.on();
        });

        nuxtApp.hook('page:finish', () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            loader.value?.off();
        });

        return {
            loader
        };
    }
});
</script>
