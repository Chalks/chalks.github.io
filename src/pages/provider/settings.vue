<script setup>
import Toolbar from '~/components/provider/Toolbar.vue';
import InvalidateTokenForm from '~/components/provider/InvalidateTokenForm.vue';

definePageMeta({
    middleware: ['auth'],
    layout: 'provider',
});

const handleInvalidateSuccess = () => {
    console.log('success');
};

const handleInvalidateError = (e) => {
    console.error(e);
};
</script>

<template>
    <Toolbar class="mb-4" is-settings />
    <h1>Settings</h1>
    <h3>Invalidate Tokens</h3>
    <p>All tokens will be invalidated and your current session will get a new token. This effectively forces you to be logged out of all other devices.</p>
    <InvalidateTokenForm @success="handleInvalidateSuccess" @error="handleInvalidateError" />


    <h3>Change Password</h3>
    <p>Change password</p>
</template>
