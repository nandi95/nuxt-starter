import type { RouterOptions, RouterScrollBehavior } from 'vue-router';

type ScrollPosition = Exclude<Exclude<ReturnType<RouterScrollBehavior>, Promise<any>>, false>;

export default {
    scrollBehavior: (to, _from, savedPosition) => {
        if (savedPosition) {
            savedPosition.behavior = 'smooth';
            return savedPosition;
        }

        const position: ScrollPosition = {
            behavior: 'smooth'
        };

        if (to.hash) {
            position.el = to.hash;
        } else {
            position.top = 0;
        }

        return position;
    }
} as RouterOptions;
