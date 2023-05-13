<script setup>
import {useProviderProjectsStore} from 'store/providerProjects.js';

import Toolbar from '~/components/provider/Toolbar.vue';

const route = useRoute();
const providerProjectsStore = useProviderProjectsStore();

definePageMeta({
    middleware: ['auth'],
    layout: 'provider',
});

providerProjectsStore.currentProjectId = route.params.id;
</script>

<template>
    <Toolbar class="mb-4" />
    <p v-if="providerProjectsStore.loading">loading</p>
    <p v-else-if="!providerProjectsStore.currentProject">Project {{ $route.params.id }}not found</p>
    <div v-else>
        <h1>{{ providerProjectsStore.currentProject.name }}</h1>
        <pre>{{ providerProjectsStore.currentProject }}</pre>
        <ul class="list-disc">
            <li>fetch the project</li>
            <li>fetch the end users</li>
        </ul>
    </div>
</template>
