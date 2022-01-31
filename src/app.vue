<template>
    <div class="relative w-screen h-screen">
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
import type { Router } from 'vue-router';

export default defineComponent({
    name: 'App',

    components: { Loader },

    setup: () => {
        useMeta(meta);
        const router = useNuxtApp().$router as Router;
        const loader = ref<InstanceType<typeof Loader>>();
        // @ts-expect-error
        provide(loaderKey, loader);

        router.beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            loader.value?.on();
            return true;
        });

        router.afterEach(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            loader.value?.off();
            return true;
        });

        return {
            loader
        };
    }
});
</script>
