<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         :viewBox="'0 0 ' + size + ' ' + size"
         :height="size + 'px'"
         :width="size + 'px'"
         class="fill-current stroke-current inline">
        <path :d="path" />
    </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api';
import { mdiGithub, mdiBookOpenPageVariantOutline } from '@mdi/js';

const icons = {
    mdiGithub,
    mdiBookOpenPageVariantOutline
} as const;

export default defineComponent({
    name: 'Icon',

    props: {
        name: {
            type: String as PropType<keyof typeof icons>,
            required: true
        },

        size: {
            type: Number,
            default: 24
        }
    },

    setup: (props) => {
        const path = computed(() => {
            const name = props.name.startsWith('mdi')
                ? props.name
                : 'mdi' + props.name.charAt(0).toUpperCase() + props.name.slice(1);

            return icons[name as keyof typeof icons];
        });

        return {
            path
        };
    }
});
</script>
