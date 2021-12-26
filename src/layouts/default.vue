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

        <div class="content flex-grow overflow-auto">
            <nuxt />
        </div>

        <Footer />
    </div>
</template>
