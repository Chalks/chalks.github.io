<script>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';

export default {
    components: {
        Footer,
        Header,
    },
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header />

        <div class="container mx-auto flex-grow my-8">
            <nuxt />
        </div>

        <Footer />
    </div>
</template>
