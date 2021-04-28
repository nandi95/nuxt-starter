<template>
    <div class="relative">
        <Nuxt />
        <div v-if="$nuxt.isOffline" class="bg-brand-500 rounded shadow absolute p-4 bottom-4 right-4 text-white">
            You're offline!
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'Default'
});
</script>

<style>
html {
    font-family:
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
</style>
