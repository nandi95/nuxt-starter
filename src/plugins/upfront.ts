import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { config } from '~/composables';

export default defineNuxtPlugin(() => {
    config.set('baseEndPoint', useRuntimeConfig().apiUrl);
});
