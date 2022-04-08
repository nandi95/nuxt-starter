<template>
    <div class="flex justify-center h-screen flex-col items-center">
        <NuxtLink to="/login" class="absolute top-5 right-5">
            <UIButton v-tooltip.left="'Go to login'"
                      outline
                      class="rounded-full w-10 h-10 relative shadow dark:shadow-lg group"
                      category="brand">
                <Icon name="arrowLeft"
                      class="absolute rotate-180 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
                             dark:group-hover:text-gray-100 dark:text-gray-300" />
            </UIButton>
        </NuxtLink>

        <div class="p-12 shadow-lg border border-gray-300 card-dark-border rounded">
            <UIAvatar class="!w-16 !h-16 bg-brand-200 dark:bg-brand-100 mx-auto mb-6">
                <Logo />
            </UIAvatar>
            <h1 class="text-transparent bg-clip-text bg-gradient-to-tr from-brand-800 to-brand-200 dark:to-brand-100
                   font-bold text-6xl p-1 select-none">
                Landing page
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from '~/components/Logo.vue';

export default defineComponent({
    name: 'Index',

    components: { Logo }
});
</script>

<style>
.dark .card-dark-border {
    border-color: #343e4d;
}
</style>
