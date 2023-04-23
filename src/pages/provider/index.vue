<script setup>
import {useProviderStore} from 'store/provider.js';
import LoginForm from '~/components/provider/LoginForm.vue';

const loginForm = ref(null);

const expired = useProviderStore().isTokenExpired;

onMounted(() => {
    loginForm.value.focus();
});

const handleError = (e) => console.error(e);

const handleSuccess = ({token, user: u}) => {
    console.log('here with token: ', token, u);
    // this.$refs.loginForm.submit();
    /*
        if (res && res.data.token) {
            document.cookie = `fcut=${res.data.token}; path=/; domain=${process.env.DOMAIN};`;

            const {query} = url.parse(window.location.href, true);
            window.location.href = query.next && !query.next.includes('/logout')
                ? query.next
                : '/forms';
    */
};
</script>
<template>
    <div class="prose mx-auto my-12 prose-red">
        <h1>JWT Provider</h1>
        <h3>{{ expired }}</h3>
        <LoginForm ref="loginForm" @error="handleError" @success="handleSuccess" />
    </div>
</template>
