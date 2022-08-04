<template>
    <div class="text-center pt-6 text-color flex flex-col space-y-2">
        <h1>404</h1>
        <p>The page you were looking for was not found</p>
        <a class="hover:text-brand-600 transition-colors
                  inline-flex rounded border py-2 px-4"
           @click="$router.back()">
            <Icon name="arrowLeft" /> Go Back
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '~/components/Icon.vue';

export default defineComponent({
    name: '404',

    components: { Icon }
});
</script>
