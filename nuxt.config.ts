import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL
        }
    },

    telemetry: false,

    srcDir: 'src',

    // todo - turn ssr on
    ssr: false,

    typescript: {
        strict: true
    },

    modules: [
        '~/modules/app-customisations.ts',
        '@nuxtjs/tailwindcss'
    ],

    meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        noscript: [
            { innerHTML: 'This website requires JavaScript.' }
        ]
    },

    css: ['@/assets/main.scss']
});
