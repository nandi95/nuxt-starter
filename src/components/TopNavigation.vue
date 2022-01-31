<template>
    <div class="shadow py-4 bg-gray-200">
        <div class="container">
            <div class="flex justify-between items-center">
                <Icon name="menu"
                      tag="button"
                      class="sm:hidden p-2 text-gray-600 rounded border border-transparent hover:border-gray-600
                             hover:bg-gray-300 shadow-none hover:shadow transition"
                      icon-classes="h-6" />
                <NuxtLink to="/admin">
                    Navigation
                </NuxtLink>

                <UIDropdown ref="dropdown" width="auto" style="min-width: max-content">
                    <template #trigger="{toggle}">
                        <UIAvatar class="cursor-pointer" :alt="userName" @click.stop="toggle" />
                    </template>

                    <ul class="rounded bg-white dark:bg-gray-500 divide-y">
                        <li role="menuitem"
                            class="py-2 px-4 transition-colors hover:bg-gray-100 dark: hover:bg-gray-600 cursor-pointer"
                            @click="() => { logout(); $refs.dropdown.hide() }">
                            Log out
                        </li>
                    </ul>
                </UIDropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import type { Router } from 'vue-router';
import { useLoader } from '~/composables';
import User from '~/upfront/models/User';
import Icon from '~/components/Icon.vue';

export default defineComponent({
    name: 'TopNavigation',

    components: { Icon },

    setup: () => {
        const router = useNuxtApp().$router as Router;
        const loader = useLoader()!;
        const userName = ref<string>();

        onMounted(async () => User.current().then(user => userName.value = user!.name));

        const logout = async () => {
            // eslint-disable-next-line
            loader.on();
            return await User.logout()
                .then(async () => router.push({ path: '/' }))
                .catch(async () => router.push({ path: '/login' }))
                // eslint-disable-next-line
                .finally(loader.off);
        };

        return {
            logout,
            userName
        };
    }
});
</script>

<style lang="scss">
a {
    @apply transition-colors;

    &:hover {
        @apply text-brand-600 transition-colors;
    }

    &.router-link-active {
        @apply text-blue-600 transition-colors;
    }
}

</style>
