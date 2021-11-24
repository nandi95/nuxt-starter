import type { NuxtOptions } from '@nuxt/schema';

export const mainColor = '#b0b199';
export const baseUrl = 'localhost:3000';
export const publicData = {
    name: 'Nuxt Starter',
    email: 'nuxt@starter.foo',
    telephone: '00000000000',
    image: baseUrl + '/icon.png',
    description: 'Build your next Vue.js application with confidence using NuxtJS. ' +
        'An open source framework making web development simple and powerful.',
    address: {
        streetAddress: 'Paper St',
        addressLocality: 'City',
        postalCode: '9000'
    },
    social: {
        facebook: '',
        instagram: '',
        twitter: ''
    }
} as const;

const titleTemplate = (titleChunk: string): string => {
    return (titleChunk ? titleChunk + ' | ' : '') + publicData.name;
};

const meta: NuxtOptions['meta'] = {
    titleTemplate,
    noscript: [
        { innerHTML: 'This website requires JavaScript.' }
    ],
    meta: [
        { name: 'author', content: baseUrl },
        { name: 'publisher', content: baseUrl },
        { name: 'apple-mobile-web-app-title', content: publicData.name },
        { name: 'theme-color', content: mainColor },
        { name: 'description', content: publicData.description },
        { name: 'twitter:title', template: titleTemplate },
        { name: 'twitter:description', content: publicData.description },
        { name: 'twitter:card', content: publicData.image },
        { name: 'twitter:image', content: publicData.image },
        { name: 'twitter:image:alt', template: titleTemplate },
        { name: 'og:title', template: titleTemplate },
        { name: 'og:description', content: publicData.description },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: baseUrl },
        { name: 'og:image', content: publicData.image },
        { name: 'og:image:secure_url', content: publicData.image },
        { name: 'og:image:alt', template: titleTemplate },
        { name: 'og:site_name', content: publicData.name }
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }
    ],
    script: [
        // todo - https://hallanalysis.com/json-ld-generator/
        // {
        //     type: 'application/ld+json',
        //     innerHtml: {
        //         '@context': 'https://schema.org',
        //         '@type': ''
        //     }
        // }
    ]
};

if (publicData.social.twitter) {
    meta.meta!.push(
        { name: 'twitter:site', content: publicData.social.twitter },
        { name: 'twitter:creator', content: publicData.social.twitter }
    );
}

export default meta;
