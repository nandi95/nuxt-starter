<template>
    <div class="container min-h-screen flex justify-center items-center text-center mx-auto">
        <div>
            <nuxt-link :to="{ name: $routeNames.index }">
                <Logo />
            </nuxt-link>
            <h1 class="title">
                Nuxt Starter
            </h1>
            <div class="pt-4 flex justify-evenly items-center">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded shadow text-green-600 border hover:shadow-none transition-all duration-50
                           border-green-600 hover:text-white hover:bg-green-600 p-4 mx-2 flex">
                    <Icon name="mdiBookOpenPageVariantOutline" class="mr-2" />
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded shadow border border-gray-600 hover:shadow-none transition-all duration-50
                           hover:text-white hover:bg-gray-600 p-4 mx-2 flex">
                    <Icon name="github" class="mr-2" />
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Icon from '~/components/Icon.vue';

export default defineComponent({
    name: 'Index',

    components: { Icon }
});
</script>

<style>
.title {
    font-family:
        'Quicksand',
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
</style>
