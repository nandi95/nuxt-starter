<template>
    <div class="container">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Default'
});
</script>

<style lang="scss" scoped>
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
