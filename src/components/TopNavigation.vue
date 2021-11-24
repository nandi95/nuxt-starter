<template>
    <div class="shadow py-4 bg-gray-200">
        <div class="container">
            <div class="flex justify-between items-center">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TopNavigation'
});
</script>

<style lang="scss">
a {
    @apply transition-colors;

    &:hover {
        @apply text-brand-600 transition-colors;
    }

    &.router-link-active {
        @apply text-blue-600 transition-colors;
    }
}

</style>
