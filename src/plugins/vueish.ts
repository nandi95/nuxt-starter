import { defineNuxtPlugin } from '#app';
import { createUILibrary } from '@karnama/vueish';
import '../../node_modules/@karnama/vueish/dist/style.css';

export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.use(createUILibrary());
});
