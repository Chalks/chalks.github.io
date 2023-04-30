<script setup>
import {toast} from 'vue3-toastify';

import {useProviderStore} from 'store/provider.js';
import {useProviderProjectsStore} from 'store/providerProjects.js';

import getMessagesFromError from '~/assets/js/provider/getMessagesFromError.js';
import Toolbar from '~/components/provider/Toolbar.vue';
import CreateProjectForm from '~/components/provider/CreateProjectForm.vue';
import DeleteFormButton from '~/components/provider/DeleteFormButton.vue';

const providerStore = useProviderStore();
const providerProjectsStore = useProviderProjectsStore();

definePageMeta({
    middleware: ['auth'],
    layout: 'provider',
});

const handleCreateProjectSuccess = ({project, name}) => {
    providerProjectsStore.addProject(project);
    toast.info(`Project '${name}' created!`);
};

const handleCreateProjectError = (e) => {
    toast.error(getMessagesFromError(e).join(', '));
};
</script>

<template>
    <Toolbar class="mb-4" is-projects />
    <h1>Projects</h1>
    <pre>{{ providerProjectsStore.projects }}</pre>

    <div
        v-for="project in providerProjectsStore.projects"
        :key="project.id"
        class="flex justify-between items-center"
    >
        <p>{{ project.name }}</p>
        <DeleteFormButton :id="project.id" />
    </div>

    <h3>Create Project</h3>
    <p>
        Projects are what your end users are authenticated to. You should have a
        different project for each app that you want to have users for.
    </p>
    <p v-if="!providerProjectsStore.canCreate" class="font-bold text-red-500">
        You've reached your project limit of {{ providerStore.limitProjects }}
    </p>
    <CreateProjectForm
        @success="handleCreateProjectSuccess"
        @error="handleCreateProjectError"
    />
</template>
