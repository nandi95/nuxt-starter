<template>
    <div class="flex flex-nowrap items-center space-x-2">
        <Icon name="sun" class="text-gray-600 dark:text-gray-300" />
        <UIToggle v-model="isDark" name="color-schema-toggle" />
        <Icon name="moon" class="text-gray-600 dark:text-gray-300" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Icon from '~/components/Icon.vue';

type ColorSchema = 'dark' | 'light';

export default defineComponent({
    name: 'ThemeSwitcher',

    components: { Icon },

    setup: () => {
        const isDark = ref(
            localStorage.getItem('color-schema') as ColorSchema | null === 'dark' ||
            window.matchMedia?.('(prefers-color-scheme: dark)').matches
        );

        watch(
            () => isDark.value,
            (val: boolean) => {
                localStorage.setItem('color-schema', val ? 'dark' : 'light');
                if (val) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        );

        return { isDark };
    }
});
</script>
