import { defineNuxtPlugin } from '#app';
// @ts-expect-error
import Vueish from '@karnama/vueish';
import '../../node_modules/@karnama/vueish/dist/style.css';

export default defineNuxtPlugin(nuxt => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    nuxt.vueApp.use(Vueish);
});
