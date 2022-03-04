import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: () => {
        return {
            menuOpen: false
        };
    }
});

export default useAppStore;
