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

/**
 * @type {import('@types/tailwindcss').TailwindConfig}
 */
module.exports = {
    mode: 'jit',
    content: [
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
                ...brandColors([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])
            }
        },
        container: {
            center: true,
            padding: '0.5rem'
        }
    }
};
