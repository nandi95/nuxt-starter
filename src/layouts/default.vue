<template>
    <div>
        <TopNavigation class="mb-4">
            <NuxtLink to="/">
                Navigation
            </NuxtLink>
            <NuxtLink to="login">
                Login
            </NuxtLink>
        </TopNavigation>
        <div class="container">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TopNavigation from '~/components/TopNavigation.vue';

export default defineComponent({
    name: 'Default',
    components: { TopNavigation }
});
</script>
