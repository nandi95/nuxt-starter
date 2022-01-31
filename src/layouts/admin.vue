<template>
    <div class="bg-gray-100 dark:bg-gray-600 h-screen">
        <TopNavigation />
        <div class="container mt-4">
            <!-- todo add fade transition to pages and suspense for async pages -->
            <!-- suspense's loader can be either a spinner or the top loader called -->
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNavigation from '~/components/TopNavigation.vue';

export default defineComponent({
    name: 'Admin',

    components: { TopNavigation }
});
</script>
