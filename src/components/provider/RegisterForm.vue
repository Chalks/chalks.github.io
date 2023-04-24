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
        const url = `${useRuntimeConfig().public.jwtApi}/auth/register`;
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
        class="prose mx-auto"
        action="#"
        method="post"
        @submit.prevent="onSubmit"
    >
        <h3>Register</h3>

        <label for="register-email">Email</label>
        <input
            id="register-email"
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
        />

        <label for="register-password">Password</label>
        <input
            id="register-password"
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
        />

        <input
            type="submit"
            value="Register"
        />
    </form>
</template>
