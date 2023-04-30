<script setup>
import {Icon} from '@iconify/vue';
import {useProviderStore} from 'store/provider.js';
import {useProviderProjectsStore} from 'store/providerProjects.js';

const emit = defineEmits(['success', 'error']);
const providerStore = useProviderStore();
const providerProjectsStore = useProviderProjectsStore();

const props = defineProps({
    id: {type: String, required: true},
});

const onClick = async () => {
    const url = `${useRuntimeConfig().public.jwtApi}/projects/${props.id}`;
    try {
        await $fetch(url, {
            method: 'delete',
            headers: {
                Authorization: providerStore.authHeaderValue,
            },
        });

        providerProjectsStore.removeProject(props.id);
        emit('success');
    } catch (e) {
        emit('error', e);
    }
};
</script>

<template>
    <button class="w-auto" @click="onClick">
        <Icon icon="game-icons:mine-explosion" />
    </button>
</template>

