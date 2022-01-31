<template>
    <component :is="tag">
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             :style="{ height: `${size}px`, width: `${size}px` }"
             aria-hidden="true"
             :class="iconClasses"
             class="fill-current inline">
            <path :d="path" />
        </svg>
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { mdiMenu, mdiArrowLeft } from '@mdi/js';

const icons = {
    menu: mdiMenu,
    arrowLeft: mdiArrowLeft
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
        },

        tag: {
            type: String as PropType<keyof HTMLElementTagNameMap>,
            default: 'span'
        },

        iconClasses: {
            type: String,
            default: 'h-5'
        }
    },

    setup: (props) => {
        const path = computed(() => icons[props.name]);

        return {
            path
        };
    }
});
</script>
