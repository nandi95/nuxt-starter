<template>
    <div>
        <div class="block sm:hidden">
            hi
        </div>
        <div class="hidden sm:block bg-brand-500 text-lg p-4 text-center">
            hi
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'Navbar'
});
</script>
