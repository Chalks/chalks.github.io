<script setup>
import {toast} from 'vue3-toastify';

import {useProviderStore} from 'store/provider.js';
import {useProviderProjectsStore} from 'store/providerProjects.js';

import getMessagesFromError from '~/assets/js/provider/getMessagesFromError.js';
import Toolbar from '~/components/provider/Toolbar.vue';
import CreateProjectForm from '~/components/provider/CreateProjectForm.vue';
import ProjectListView from '~/components/provider/ProjectListView.vue';

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

    <div
        v-if="providerProjectsStore.projects.length === 0"
        class="border border-gray-300 bg-gray-100 rounded shadow-lg p-4 text-center"
    >
        <p class="text-gray-600 italic">Create a project to get started</p>
    </div>
    <ProjectListView
        v-for="project in providerProjectsStore.projects"
        :key="project.id"
        :project="project"
        class="my-2"
    />

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
