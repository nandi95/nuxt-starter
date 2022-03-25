import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'Router extend module'
    },
    hooks: {
        // ensure  all admin routes have their layout set
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'pages:extend': (pages) => {
            pages.forEach(page => {
                if (page.path.startsWith('/admin')) {
                    page.meta = page.meta ? { ...page.meta, layout: 'admin' } : { layout: 'admin' };
                }
            });
        },

        // ensure upfront loaded before auth plugin
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'app:resolve': (app) => {
            const plugins = app.plugins;
            const upfrontPluginIndex = plugins.findIndex(plugin => plugin.src.endsWith('upfront.ts'));
            const upfrontPlugin = plugins.splice(upfrontPluginIndex, 1);
            const authPluginIndex = plugins.findIndex(plugin => plugin.src.endsWith('auth.client.ts'));
            plugins.splice(authPluginIndex, 0, ...upfrontPlugin);

            app.plugins = plugins;
        }
    }
});
