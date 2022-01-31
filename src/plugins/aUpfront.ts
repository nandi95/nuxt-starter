import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { config } from '~/composables';

// named aUpfront to be loaded before auth.client.ts
export default defineNuxtPlugin(() => {
    config.set('baseEndPoint', useRuntimeConfig().apiUrl);
});
