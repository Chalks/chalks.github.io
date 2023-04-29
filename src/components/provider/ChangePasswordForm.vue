<script setup>
import {useProviderStore} from 'store/provider.js';

const currentPassword = ref('');
const newPassword = ref('');
const currentPasswordField = ref(null);

const focus = () => currentPasswordField.value.focus();
const clear = () => {
    currentPassword.value = '';
    newPassword.value = '';
};

const emit = defineEmits(['success', 'error']);

const onSubmit = async () => {
    try {
        const url = `${useRuntimeConfig().public.jwtApi}/auth/changePassword`;
        const response = await $fetch(url, {
            method: 'post',
            body: JSON.stringify({
                currentPassword: currentPassword.value,
                newPassword: newPassword.value,
            }),
            headers: {
                Authorization: useProviderStore().authHeaderValue,
            },
        });

        clear();
        emit('success', response);
    } catch (e) {
        focus();
        emit('error', e);
    }
};
</script>

<template>
    <form
        action="#"
        method="post"
        @submit.prevent="onSubmit"
    >
        <label for="change-current">Current Password</label>
        <input
            id="change-current"
            ref="currentPasswordField"
            v-model="currentPassword"
            type="password"
            placeholder="Current Password"
            name="current-password"
        />

        <label for="login-password">New Password</label>
        <input
            id="change-new"
            v-model="newPassword"
            type="password"
            placeholder="New Password"
            name="new-password"
        />

        <input
            type="submit"
            value="Change Password"
        />
    </form>
</template>