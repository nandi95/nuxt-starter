import type { NuxtConfig } from '@nuxt/types';
import type { ColorModeConfig } from '@nuxtjs/color-mode/types/color-mode';
import type { CreateImageOptions } from '@nuxt/image';

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: (titleChunk) => {
            return (titleChunk ? titleChunk + ' | ' : '') + 'Nuxt Starter';
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },

    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        // https://composition-api.nuxtjs.org/
        '@nuxtjs/composition-api/module',
        // https://color-mode.nuxtjs.org/
        '@nuxtjs/color-mode',
        // https://image.nuxtjs.org
        '@nuxt/image'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://sitemap.nuxtjs.org/
        '@nuxtjs/sitemap'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // https://composition-api.nuxtjs.org/getting-started/setup
    generate: {
        interval: 2000
    },

    tailwindcss: {
        jit: true
    },

    sitemap: {
        hostname: 'http://localhost:3000/'
    },

    colorMode: {
        fallback: 'light',
        classSuffix: ''
    } as ColorModeConfig,

    image: {} as CreateImageOptions
} as NuxtConfig;
