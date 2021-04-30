import type { NuxtConfig } from '@nuxt/types';
import type { ColorModeConfig } from '@nuxtjs/color-mode/types/color-mode';
import type { CreateImageOptions } from '@nuxt/image';
import head from './config/head';
import { mainColor, baseUrl, publicData } from './config/constants';

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head,

    publicRuntimeConfig: {
        baseUrl,
        ...publicData
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/routeNames.ts' }
    ],

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

    loading: {
        color: mainColor,
        height: '5px'
    },

    tailwindcss: {
        jit: true
    },

    sitemap: {
        hostname: process.env.BASE_URL ?? 'http://localhost:3000/',
        gzip: true
    },

    robots: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                Sitemap: `${process.env.BASE_URL}/sitemap.xml`
            };
        }
        return {
            Disallow: '/'
        };
    },

    colorMode: {
        fallback: 'light',
        classSuffix: ''
    } as ColorModeConfig,

    image: {} as CreateImageOptions
} as NuxtConfig;
