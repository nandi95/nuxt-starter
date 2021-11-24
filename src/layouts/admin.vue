<template>
    <div class="bg-gray-100 dark:bg-gray-600 h-screen">
        <TopNavigation>
            <NuxtLink to="/">
                Navigation
            </NuxtLink>

            <UIDropdown>
                <template #trigger="{toggle}">
                    <UIAvatar class="cursor-pointer" :alt="user.name" @click.stop="toggle" />
                </template>

                <ul class="rounded bg-white dark:bg-gray-500 divide-y">
                    <li role="menuitem"
                        class="py-2 px-4 transition-colors hover:bg-gray-100 dark: hover:bg-gray-600cursor-pointer"
                        @click="logout">
                        Log out
                    </li>
                </ul>
            </UIDropdown>
        </TopNavigation>
        <div class="container mt-4">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNavigation from '~/components/TopNavigation.vue';
import { useAsyncData, useNuxtApp } from '#app';
import type { Router } from 'vue-router';
import User from '~/models/User';
import { useLoader } from '~/composables';

export default defineComponent({
    name: 'Admin',

    components: { TopNavigation },

    setup: async () => {
        const router = useNuxtApp().$router as Router;
        const loader = useLoader()!;
        const { data } = await useAsyncData(
            'currentUser',
            async () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                loader.on();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                return User.current().finally(() => loader.off());
            },
            { server: false }
        );

        const logout = async () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            loader.on();
            return await User.logout()
                .then(async () => router.push('/'))
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                .finally(() => loader.off());
        };

        return {
            logout,
            user: data
        };
    }
});
</script>
