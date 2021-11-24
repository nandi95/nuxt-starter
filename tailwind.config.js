const brandColor = level => {
    return function ({opacityVariable, opacityValue}) {
        if (opacityValue) {
            return `rgba(var(--color-brand-${level}), ${opacityValue})`;
        }
        if (opacityVariable) {
            return `rgba(var(--color-brand-${level}), var(${opacityVariable}, 1))`;
        }
        return `rgb(var(--color-brand-${level}))`;
    };
};

const brandColors = levels => {
    const colors = {};

    levels.forEach(level => colors['brand-' + String(level)] = brandColor(level));

    return colors;
};
const colors = require('tailwindcss/colors')

/**
 * @type {import('@types/tailwindcss').TailwindConfig}
 */
module.exports = {
    mode: 'jit',
    purge: [
        './src/components/**/*.{vue,ts,tsx}',
        './src/pages/**/*.{vue,ts,tsx}',
        './src/layouts/**/*.{vue,ts,tsx}',
        './node_modules/@karnama/vueish/dist/**/*',
        './app.vue'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                '2xs': '320px',
                xs: '480px'
            },
            colors: {
                ...colors,
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            }
        },
        container: {
            center: true,
            padding: '0.5rem'
        }
    },
    variants: {
        extend: {}
    }
};

// import type { TailwindConfig } from 'tailwindcss/tailwind-config';
//
// type DeepPartial<T> = {
//     [P in keyof T]?: DeepPartial<T[P]>;
// };
//
// // todo - brand colors do not transpile correctly
// const brandColor = (level: number) => {
//     return function({ opacityVariable, opacityValue }: { opacityVariable: string; opacityValue: string | number }) {
//         if (opacityValue) {
//             return `rgba(var(--color-brand-${level}), ${opacityValue})`;
//         }
//         if (opacityVariable) {
//             return `rgba(var(--color-brand-${level}), var(${opacityVariable}, 1))`;
//         }
//         return `rgb(var(--color-brand-${level}))`;
//     };
// };
//
// const brandColors = (levels: number[]) => {
//     const colors: Record<string, CallableFunction> = {};
//
//     levels.forEach(level => colors['brand-' + String(level)] = brandColor(level));
//
//     return colors;
// };
//
// export default {
//     purge: ['./src/**/*.{vue,ts,tsx}'],
//     darkMode: 'class',
//     mode: 'jit',
//     theme: {
//         borderColor: (theme: any) => ({
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//             ...theme('colors'),
//             // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unsafe-call
//             DEFAULT: theme('colors.gray.400', 'currentColor')
//         }),
//         extend: {
//             colors: {
//                 ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
//             },
//             transitionProperty: {
//                 spacing: 'margin, padding'
//             }
//         }
//     }
// } as DeepPartial<TailwindConfig>;
