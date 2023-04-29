<script setup>
import {Icon} from '@iconify/vue';
import {useProviderStore} from 'store/provider.js';

const PROJECTS = 'Projects';
const SETTINGS = 'Settings';

const props = defineProps({
    isProjects: {type: Boolean, default: false},
    isSettings: {type: Boolean, default: false},
    isThree: {type: Boolean, default: false},
});

const pageIcons = ref([
    {page: PROJECTS, order: 1, name: 'icon-park-outline:more-app'},
    {page: SETTINGS, order: 2, name: 'material-symbols:settings-account-box'},
    {page: 'foo', order: 3, name: 'material-symbols:counter-3-outline-rounded'},
    {page: 'bar', order: 4, name: 'material-symbols:counter-4-outline'},
]);

const currentPage = ref('');

if (props.isProjects) {
    currentPage.value = PROJECTS;
}

if (props.isSettings) {
    currentPage.value = SETTINGS;
}

if (props.isThree) {
    currentPage.value = 'foo';
}

/*
 * if I want to sort the current page to the start:
 * pageIcons.value.sort(({page: pageA, order: a}, {page: pageB, order: b}) => {
 *     if (pageA === currentPage.value) return -1;
 *     if (pageB === currentPage.value) return 1;
 *     return a - b;
 * });
*/

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
            <p v-if="icon.page === currentPage" class="ml-2 my-0 p-0">
                {{ currentPage }}
            </p>
        </NuxtLink>

        <a
            title="logout"
            class="cursor-pointer"
            @click="logout"
        >
            <Icon icon="solar:logout-outline" />
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
