import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxt => {
    nuxt.hook('app:created', () => {
        // set the dark class on the html tag if required
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const setting = localStorage.getItem('color-schema') ?? 'auto';

        // eslint-disable-next-line no-mixed-operators
        if (setting === 'dark' || prefersDark && setting !== 'light') {
            document.documentElement.classList.toggle('dark', true);
        }
    });
});
