<script>
import LoginForm from '~/components/provider/LoginForm.vue';

export default {
    components: {
        LoginForm,
    },

    methods: {
        focusContact() {
            this.$refs.loginForm.focus();
        },
    },
};
</script>
<template>
    <div class="prose mx-auto my-12 prose-red">
        <h1>JWT Provider</h1>
        <LoginForm ref="loginForm" />
    </div>
</template>
