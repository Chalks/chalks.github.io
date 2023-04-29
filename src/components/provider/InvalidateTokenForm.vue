<script setup>
import {useProviderStore} from 'store/provider.js';

const emit = defineEmits(['success', 'error']);
const providerStore = useProviderStore();

const onSubmit = async () => {
    try {
        const url = `${useRuntimeConfig().public.jwtApi}/auth/invalidateTokens`;
        const {token} = await $fetch(url, {
            method: 'get',
            headers: {
                Authorization: providerStore.authHeaderValue,
            },
        });

        providerStore.setToken(token);
        emit('success', token);
    } catch (e) {
        emit('error', e);
    }
};
</script>

<template>
    <form
        action="#"
        method="get"
        @submit.prevent="onSubmit"
    >
        <input
            type="submit"
            value="Invalidate Tokens"
        />
    </form>
</template>
