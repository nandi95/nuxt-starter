<template>
    <div class="relative w-screen h-screen">
        <Loader ref="loader" />
        <div>
            <NuxtPage />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { useMeta } from '#meta';
import meta from '~/composables/meta';
import Loader from '~/components/Loader.vue';
import { config, loaderKey } from '~/composables';
import { useRuntimeConfig } from '#app';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'App',

    components: { Loader },

    setup: () => {
        useMeta(meta);
        const router = useRouter();
        const loader = ref<InstanceType<typeof Loader>>();
        provide(loaderKey, loader);
        config.set('baseEndPoint', useRuntimeConfig().apiUrl);

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
