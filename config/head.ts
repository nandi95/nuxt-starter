import type { NuxtConfig } from '@nuxt/types';
import { publicData, baseUrl, mainColor } from './constants';

type NuxtOptionsHead = NonNullable<Exclude<NuxtConfig['head'], () => void>>;

const titleTemplate: NuxtOptionsHead['titleTemplate'] = titleChunk => {
    // todo - get that value from the constants
    return (titleChunk ? titleChunk + ' | ' : '') + 'Nuxt Starter';
};

// Global page headers: https://go.nuxtjs.dev/config-head
const head = {
    titleTemplate,
    meta: [
        { charset: 'utf-8' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'author',
            name: 'author',
            content: baseUrl
        },
        {
            hid: 'publisher',
            name: 'publisher',
            content: baseUrl
        },
        {
            hid: 'apple-web-app-title',
            name: 'apple-mobile-web-app-title',
            content: publicData.name
        },
        {
            hid: 'theme-color',
            name: 'theme-color',
            content: mainColor
        },
        {
            hid: 'description',
            name: 'description',
            content: publicData.description
        },
        {
            hid: 'twitter:title',
            name: 'twitter:title',
            template: titleTemplate
        },
        {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: publicData.description
        },
        {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: publicData.image
        },
        {
            hid: 'twitter:image',
            name: 'twitter:image',
            content: publicData.image
        },
        {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            template: titleTemplate
        },
        {
            hid: 'og:title',
            name: 'og:title',
            template: titleTemplate
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: publicData.description
        },
        {
            hid: 'og:type',
            name: 'og:type',
            content: 'website'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: baseUrl
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: publicData.image
        },
        {
            hid: 'og:image:secure_url',
            name: 'og:image:secure_url',
            content: publicData.image
        },
        {
            hid: 'og:image:alt',
            name: 'og:image:alt',
            template: titleTemplate
        },
        {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: publicData.name
        }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ],
    noscript: [
        { innerHTML: 'This website requires JavaScript.' }
    ],
    script: [
        // {
        //     type: 'application/ld+json',
        //     json: {
        //         '@context': 'https://schema.org',
        //         '@type': ''
        //     }
        // }
    ]
} as NuxtOptionsHead;

if (publicData.social.twitter) {
    head!.meta!.push(
        {
            hid: 'twitter:site',
            name: 'twitter:site',
            content: publicData.social.twitter
        },
        {
            hid: 'twitter:creator',
            name: 'twitter:creator',
            content: publicData.social.twitter
        }
    );
}

head.meta = head.meta!.map(meta => {
    if (!meta.charset) {
        meta.property = meta.name;
    }

    return meta;
});

export default head;
