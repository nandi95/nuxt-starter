<template>
    <div class="flex justify-center">
        <p class="bg-red-400 text-white py-4 px-6 rounded select-none">
            Hello {{ user?.name ?? 'World' }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { user } from '~/upfront/models/User';

export default defineComponent({
    name: 'Index',

    setup: () => {
        return {
            user
        };
    }
});
</script>
