import { computed, ComputedRef, onBeforeMount } from '@nuxtjs/composition-api';

interface DarkModeReturn {
    isDark: ComputedRef<boolean>;
    toggleTheme: () => void;
    removeTheme: () => void;
}

const useTailwindDarkMode: () => DarkModeReturn = () => {
    const htmlPage = document.querySelector('html');
    if (!(htmlPage instanceof HTMLHtmlElement)) {
        throw new TypeError('No root html element found');
    }

    onBeforeMount(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === 'dark' ||
            !('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            htmlPage.classList.add('dark');
        } else {
            htmlPage.classList.remove('dark');
        }
    });

    const isDark = computed(() => localStorage.theme === 'dark');
    const toggleTheme = () => {
        // Whenever the user explicitly chooses light mode
        if (htmlPage.classList.contains('dark')) {
            htmlPage.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            // Whenever the user explicitly chooses dark mode
            localStorage.theme = 'dark';
            htmlPage.classList.add('dark');
        }
    };
    const removeTheme = () => {
        localStorage.removeItem('theme');
    };

    return {
        isDark,
        toggleTheme,
        removeTheme
    };
};

export default useTailwindDarkMode;
