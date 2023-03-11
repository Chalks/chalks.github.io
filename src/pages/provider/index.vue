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

        handleError(e) {
            console.error(e);
        },

        handleSuccess(token) {
            console.log('here with token: ', token);
            // this.$refs.loginForm.submit();
            /*
                if (res && res.data.token) {
                    document.cookie = `fcut=${res.data.token}; path=/; domain=${process.env.DOMAIN};`;

                    const {query} = url.parse(window.location.href, true);
                    window.location.href = query.next && !query.next.includes('/logout')
                        ? query.next
                        : '/forms';
            */
        },
    },
};
</script>
<template>
    <div class="prose mx-auto my-12 prose-red">
        <h1>JWT Provider</h1>
        <LoginForm ref="loginForm" @error="handleError" @success="handleSuccess" />
    </div>
</template>
