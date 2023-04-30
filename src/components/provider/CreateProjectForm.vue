<script setup>
import {useProviderStore} from 'store/provider.js';
import {useProviderProjectsStore} from 'store/providerProjects.js';

const providerStore = useProviderStore();
const providerProjectsStore = useProviderProjectsStore();

const name = ref('');
const nameField = ref(null);

const focus = () => nameField.value.focus();
const clear = () => { name.value = ''; };
const emit = defineEmits(['success', 'error']);

const onSubmit = async () => {
    try {
        const url = `${useRuntimeConfig().public.jwtApi}/projects`;
        const project = await $fetch(url, {
            method: 'post',
            body: {
                name: name.value,
            },
            headers: {
                Authorization: providerStore.authHeaderValue,
            },
        });

        emit('success', {project, name: name.value});
        clear();
    } catch (e) {
        focus();
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
        <label for="create-project-name">Project Name</label>
        <input
            id="create-project-name"
            ref="nameField"
            v-model="name"
            type="text"
            placeholder="Project Name"
            name="project-name"
            :disabled="!providerProjectsStore.canCreate"
        />

        <input
            type="submit"
            value="Create Project"
            :disabled="!providerProjectsStore.canCreate"
        />
    </form>
</template>

