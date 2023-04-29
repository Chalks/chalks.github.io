<script setup>
import Toolbar from '~/components/provider/Toolbar.vue';

definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    <div class="prose mx-auto my-12 prose-blue px-4">
        <Toolbar class="mb-4" is-settings />
        <h1>Settings</h1>
    </div>
</template>
