<template>
    <div>
        <div class="shadow py-4 bg-gray-200">
            <div class="container">
                <div class="flex justify-between items-center">
                    <NuxtLink to="/">
                        Navigation
                    </NuxtLink>
                    <NuxtLink to="login">
                        Login
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="container mt-4">
            <slot />
        </div>
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
