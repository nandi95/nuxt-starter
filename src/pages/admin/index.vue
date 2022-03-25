<template>
    <div class="flex justify-center">
        <p class="bg-slate-300 text-gray-600 dark:bg-slate-700 dark:text-white py-4 px-6 rounded select-none shadow">
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
