<script setup>
import Toolbar from '~/components/provider/Toolbar.vue';

definePageMeta({
    middleware: ['auth'],
    layout: 'provider',
});
</script>

<template>
    <Toolbar class="mb-4" is-projects />
    <h1>Projects</h1>
    <p>list of projects</p>
    <p>create project</p>
</template>
