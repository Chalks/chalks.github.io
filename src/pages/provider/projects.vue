<script setup>
import {useProviderStore} from 'store/provider.js';
import Toolbar from '~/components/provider/Toolbar.vue';

const providerStore = useProviderStore();

const logout = async () => {
    await providerStore.logout();
    navigateTo('/provider');
};

definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    <div class="prose mx-auto my-12 prose-blue px-4">
        <Toolbar class="mb-4" is-projects />
        <h1>Projects</h1>
        <button class="submit" @click="logout">logout</button>
    </div>
</template>
