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

export default defineComponent({
    name: 'App',

    components: { Loader },

    setup: () => {
        useHead(meta);
        const loader = ref<InstanceType<typeof Loader>>();
        const nuxtApp = useNuxtApp();
        // @ts-expect-error
        provide(loaderKey, loader);

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
