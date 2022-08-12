<template>
    <div class="relative w-screen h-screen bg-slate-200 dark:bg-gray-700">
        <ClientOnly>
            <Loader ref="loader" />
        </ClientOnly>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import meta from '~/composables/meta';
import Loader from '~/components/Loader.vue';
import { loaderKey } from '~/composables';
import { useNuxtApp, useHead } from '#app';
import type { LoaderMethods } from '~/types';

export default defineComponent({
    name: 'App',

    components: { Loader },

    setup: () => {
        useHead(meta);
        const loader = ref<LoaderMethods>();
        const nuxtApp = useNuxtApp();
        provide(loaderKey, loader);

        let timeout: ReturnType<typeof setTimeout>;

        nuxtApp.hook('page:start', () => {
            timeout = setTimeout(() => {
                clearTimeout(timeout);
                loader.value?.on();
            }, 50);
        });

        nuxtApp.hook('page:finish', () => {
            clearTimeout(timeout);
            loader.value?.off();
        });

        return {
            loader
        };
    }
});
</script>
