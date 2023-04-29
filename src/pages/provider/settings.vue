<script setup>
import {toast} from 'vue3-toastify';
import getMessagesFromError from '~/assets/js/provider/getMessagesFromError.js';
import Toolbar from '~/components/provider/Toolbar.vue';
import InvalidateTokenForm from '~/components/provider/InvalidateTokenForm.vue';
import ChangePasswordForm from '~/components/provider/ChangePasswordForm.vue';

definePageMeta({
    middleware: ['auth'],
    layout: 'provider',
});

const handleInvalidateSuccess = () => {
    toast.info('Successfully invalidated tokens');
};

const handleInvalidateError = (e) => {
    toast.error('There was an error, please refresh and try again');
    console.error(e);
};

const handleChangeSuccess = () => {
    toast.info('Successfully changed password');
};

const handleChangeError = (e) => {
    toast.error(getMessagesFromError(e).join(', '));
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
    <ChangePasswordForm @success="handleChangeSuccess" @error="handleChangeError" />
</template>
