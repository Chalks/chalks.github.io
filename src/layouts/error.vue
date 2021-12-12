<script>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
import ErrorForm from '~/components/ErrorForm.vue';

export default {
    components: {
        Footer,
        Header,
        ErrorForm,
    },
};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header />

        <div class="container mx-auto flex-grow my-8">
            <ErrorForm />
        </div>

        <Footer />
    </div>
</template>

