import type { RouterOptions } from 'vue-router';

export default <RouterOptions>{
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
