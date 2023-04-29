<script setup>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />

        <div class="content flex-grow overflow-auto">
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>

        <AppFooter />
    </div>
</template>
