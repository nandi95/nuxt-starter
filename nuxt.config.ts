import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL
    },

    srcDir: 'src',

    // todo - turn ssr on
    ssr: false,
    target: 'static',
    vite: {
        server: {
            hmr: {
                protocol: 'ws',
                host: 'website.test'
            }
        }
    },

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
