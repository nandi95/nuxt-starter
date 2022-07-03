<template>
    <div class="flex flex-col justify-center h-screen">
        <NuxtLink to="/" class="absolute top-5 left-5">
            <UIButton v-tooltip.right="'Go back'"
                      outline
                      class="rounded-full w-10 h-10 relative shadow dark:shadow-lg group"
                      theme="brand">
                <Icon name="arrowLeft"
                      class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                             dark:group-hover:text-gray-100 dark:text-gray-300" />
            </UIButton>
        </NuxtLink>

        <UIPanel class="md:w-[500px] md:mx-auto !bg-slate-100 dark:!bg-gray-600">
            <UIAvatar class="!h-24 !w-24 bg-brand-200 dark:bg-brand-100 mx-auto mb-6">
                <Logo />
            </UIAvatar>

            <UIButton v-if="$isAuthenticated" theme="blue" @click="$router.push('/admin')">
                Proceed to dashboard
            </UIButton>
            <template v-else>
                <UIInput v-model="email"
                         name="email"
                         placeholder="Email"
                         type="email" />
                <UIInput v-model="password"
                         name="password"
                         class="my-2"
                         type="password"
                         placeholder="Password" />
                <UIExpandTransition>
                    <p v-if="error" class="text-red-800" v-text="error" />
                </UIExpandTransition>
            </template>

            <template v-if="!$isAuthenticated" #footer>
                <div class="flex w-full items-center justify-center xs:!justify-between flex-wrap">
                    <UICheckbox v-model="remember"
                                name="remember"
                                class="mb-2 xs:mb-0"
                                label="Remember me" />
                    <UIButton theme="brand" class="!px-12" @click="login">
                        Log In
                    </UIButton>
                </div>
            </template>
        </UIPanel>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import type { RouteLocationNormalized, Router } from 'vue-router';
import User from '~/upfront/models/User';
import { useLoader } from '~/composables';
import { parseError } from '~/utils/ErrorHandler';
import Logo from '~/components/Logo.vue';
import Icon from '~/components/Icon.vue';

export default defineComponent({
    name: 'Login',

    components: { Icon, Logo },

    setup: () => {
        const email = ref('test@email.com');
        const password = ref('password');
        const remember = ref(false);
        const error = ref<string | null>(null);
        const router = useNuxtApp().$router as Router;
        const loader = useLoader()!;

        let initialTarget: RouteLocationNormalized | null | string = localStorage.getItem('initialTarget');

        if (initialTarget) {
            try {
                initialTarget = JSON.parse(initialTarget);
                localStorage.removeItem('initialTarget');
            } catch (e: unknown) {}
        }

        const login = async () => {
            loader.value.on();
            error.value = null;
            await User.login(email.value, password.value, remember.value)
                .catch(async errorResponse => {
                    const handler = await parseError(errorResponse);
                    const msg = handler.getErrors('email');
                    if (msg?.length) {
                        error.value = msg[0];
                    }
                })
                .then(async () => router.push(initialTarget ?? { path: 'admin' }))
                .finally(loader.value.off);
        };

        watch([email, password], () => {
            if (error.value) {
                error.value = null;
            }
        });

        return {
            email,
            password,
            remember,
            login,
            error
        };
    }
});
</script>
