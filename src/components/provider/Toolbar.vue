<script setup>
import {Icon} from '@iconify/vue';
import {useProviderStore} from 'store/provider.js';

const PROJECTS = 'Projects';
const SETTINGS = 'Settings';

const props = defineProps({
    isProjects: {type: Boolean, default: false},
    isSettings: {type: Boolean, default: false},
});

const pageIcons = ref([
    {page: PROJECTS, order: 1, name: 'icon-park-outline:more-app'},
    {page: SETTINGS, order: 2, name: 'material-symbols:settings-account-box'},
]);

const currentPage = ref('');

if (props.isProjects) {
    currentPage.value = PROJECTS;
}

if (props.isSettings) {
    currentPage.value = SETTINGS;
}

const providerStore = useProviderStore();
const logout = async () => {
    await providerStore.logout();
    navigateTo('/provider');
};
</script>

<template>
    <div class="flex space-x-4 items-center">
        <NuxtLink
            v-for="icon in pageIcons"
            :key="icon.page"
            :to="`/provider/${icon.page.toLowerCase()}`"
            :title="icon.page"
            :class="{
                'flex': true,
                'items-center': true,
                'active': icon.page === currentPage,
            }"
        >
            <Icon
                :icon="icon.name"
            />
            <p class="ml-2 my-0 p-0">
                {{ icon.page }}
            </p>
        </NuxtLink>

        <a
            title="logout"
            class="cursor-pointer flex items-center"
            @click="logout"
        >
            <Icon icon="solar:logout-outline" />
            <p class="ml-2 my-0 p-0">
                Logout
            </p>
        </a>
    </div>
</template>

<style scoped>
    a {
        @apply text-red-300 no-underline hover:text-red-600 transition-colors;
    }

    .active {
        @apply text-red-600;
    }
</style>
