import type { NuxtConfig } from '@nuxt/types';

const titleTemplate: Exclude<NonNullable<NuxtConfig['head']>, () => void>['titleTemplate'] = (titleChunk) => {
    return (titleChunk ? titleChunk + ' | ' : '') + 'Nuxt Starter';
};

const description = 'Build your next Vue.js application with confidence using NuxtJS. ' +
    'An open source framework making web development simple and powerful.';
const image = '/icon.png';

// Global page headers: https://go.nuxtjs.dev/config-head
export default {
    titleTemplate,
    meta: [
        { charset: 'utf-8' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: description
        },
        {
            hid: 'twitter:title',
            name: 'twitter:title',
            template: titleTemplate
        },
        {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description
        },
        {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: image
        },
        {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            template: titleTemplate
        },
        {
            hid: 'og:title',
            property: 'og:title',
            template: titleTemplate
        },
        {
            hid: 'og:description',
            property: 'og:description',
            content: description
        },
        {
            hid: 'og:image',
            property: 'og:image',
            content: image
        },
        {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: image
        },
        {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            template: titleTemplate
        }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ]
} as NuxtConfig['head'];
