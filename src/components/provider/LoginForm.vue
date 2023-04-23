<script setup>
import {useProviderStore} from 'store/provider.js';

const email = ref('');
const password = ref('');
const emailField = ref(null);

const focus = () => emailField.value.focus();

defineExpose({focus});

const emit = defineEmits(['success', 'error']);

const onSubmit = async () => {
    try {
        const url = `${useRuntimeConfig().jwtApi}/auth/login`;
        const {token, user} = await $fetch(url, {
            method: 'post',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        useProviderStore().setUserWithToken({user, token});
        emit('success', {token, user});
    } catch (e) {
        focus();
        emit('error', e);
    }
};
</script>

<template>
    <form
        ref="loginForm"
        class="prose mx-auto"
        action="#"
        method="post"
        @submit.prevent="onSubmit"
    >
        <h3>Login</h3>

        <label for="login-email">Email</label>
        <input
            id="login-email"
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
        />

        <label for="login-password">Password</label>
        <input
            id="login-password"
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
        />

        <input
            type="submit"
            value="Submit"
        />
    </form>
</template>
