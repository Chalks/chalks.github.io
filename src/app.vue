<script>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';

export default {
    components: {
        AppFooter,
        AppHeader,
    },
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />

        <div class="content flex-grow overflow-auto">
            <NuxtPage />
        </div>

        <AppFooter />
    </div>
</template>
