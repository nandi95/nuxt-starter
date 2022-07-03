import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
    scrollBehavior: (to, _from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        }

        const position: Record<string, number | string> = {
            top: 0,
            behavior: 'smooth'
        };

        if (to.hash) {
            position.selector = to.hash;
        }

        return position;
    }
};
