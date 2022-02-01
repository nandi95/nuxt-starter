<template>
    <UIFadeTransition>
        <UILinearLoader v-if="visibility" class="absolute" v-bind="props" />
    </UIFadeTransition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import type { LoaderMethods, CustomisableProps } from '~/types';

export default defineComponent({
    name: 'Loader',

    expose: ['on', 'off', 'setProps'],

    setup: () => {
        let startTime: ReturnType<Date['getTime']>;
        let timeout: ReturnType<typeof setTimeout>;

        const isVisible = ref(false);
        const visibility = computed({
            get: () => isVisible.value,
            set: (val) => {
                if (val) {
                    clearTimeout(timeout);
                    startTime = new Date().getTime();
                    isVisible.value = true;
                } else {
                    // make sure it isn't just a flash
                    if (startTime && new Date().getTime() - startTime < 250) {
                        timeout = setTimeout(() => isVisible.value = false, 250);
                    } else {
                        isVisible.value = false;
                    }
                }
            }
        });
        const props = reactive<CustomisableProps>({
            determinate: false,
            height: 4,
            progress: 0,
            steps: 2
        });

        const on = () => visibility.value = true;
        const off = () => visibility.value = false;
        const setProps = (properties: Partial<CustomisableProps>) => {
            Object.keys(props).forEach(key => {
                // @ts-expect-error
                props[key] = properties[key];
            });
        };

        return {
            visibility,
            on,
            off,
            props,
            setProps
        };
    }
});
</script>
