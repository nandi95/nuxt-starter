<template>
    <div class="text-center pt-6">
        <h1>404</h1>
        <p>The page you were looking for was not found</p>
        <a class="cursor-pointer hover:text-brand-600 transition-colors flex flex-row justify-center mt-6"
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
