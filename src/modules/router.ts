import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'Router extend module'
    },
    hooks: {
        'pages:extend': (pages) => {
            pages.forEach(page => {
                if (page.path.startsWith('/admin')) {
                    page.meta = page.meta ? { ...page.meta, layout: 'admin' } : { layout: 'admin' };
                }
            });
        }
    }
});
