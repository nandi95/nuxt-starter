import { defineNuxtConfig } from 'nuxt3';
import path from 'path';
import { bundle } from '@nuxt/webpack-builder-edge';

export default defineNuxtConfig({
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL
    },

    srcDir: 'src',

    // todo - turn ssr on
    ssr: false,
    target: 'static',
    builder: { bundle }, // todo - set to vite when resolved: https://github.com/nuxt/framework/issues/1796

    typescript: {
        strict: true
    },

    modules: [
        '~/modules/app-customisations.ts',
        '@nuxtjs/tailwindcss'
    ],

    autoImports: {
        sources: [
            {
                from: 'nuxt3',
                disabled: true
            },
            {
                // todo - still getting the warn
                from: path.join(process.cwd(), '/src/composables/index.ts'),
                disabled: true
            }
        ]
    },

    meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        noscript: [
            { innerHTML: 'This website requires JavaScript.' }
        ]
    },

    css: ['@/assets/main.scss']
});
