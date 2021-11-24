import { defineNuxtPlugin } from '#app';
// @ts-expect-error
import Vueish from '@karnama/vueish';

export default defineNuxtPlugin(nuxt => {
    // todo - only load if layout is default and not already loaded
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    nuxt.vueApp.use(Vueish);
    // @ts-expect-error
    import('../../node_modules/@karnama/vueish/dist/style.css');
});
