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
