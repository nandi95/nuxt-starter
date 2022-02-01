<template>
    <div class="space-y-2 flex flex-col justify-center align-middle">
        <UIButton v-if="$isAuthenticated" category="primary" @click="$router.push('/admin')">
            Proceed to dashboard
        </UIButton>
        <template v-else>
            <UIInput v-model="email"
                     name="email"
                     placeholder="Email"
                     type="email" />
            <UIInput v-model="password"
                     name="password"
                     type="password"
                     placeholder="Password" />
            <UIExpandTransition>
                <p v-if="error" class="text-red-800" v-text="error" />
            </UIExpandTransition>
            <UICheckbox v-model="remember" name="remember" label="Remember me" />
            <UIButton category="primary" @click="login">
                Log In
            </UIButton>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import type { RouteLocationNormalized, Router } from 'vue-router';
import User from '~/upfront/models/User';
import { useLoader } from '~/composables';
import ErrorHandler from '~/utils/ErrorHandler';

export default defineComponent({
    name: 'Login',

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
            loader.on();
            error.value = null;
            await User.login(email.value, password.value, remember.value)
                .catch(async errorResponse => {
                    const handler = new ErrorHandler(errorResponse);
                    const msg = await handler.getErrors('email');
                    if (msg?.length) {
                        error.value = msg[0];
                    }
                })
                .then(async () => router.push(initialTarget ?? { path: 'admin' }))
                .finally(loader.off);
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
