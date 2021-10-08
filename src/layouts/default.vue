<script>
import Footer from '~/components/Footer.vue';

export default {
    components: {
        Footer,
    },
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div class="container mx-auto flex-grow my-8">
            <nuxt />
        </div>

        <Footer />
    </div>
</template>
