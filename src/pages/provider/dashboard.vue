<script setup>
import {useProviderStore} from 'store/provider.js';

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
        <h1>Projects</h1>
        <button class="submit" @click="logout">logout</button>
    </div>
</template>
