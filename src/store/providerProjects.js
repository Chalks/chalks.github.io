import {defineStore} from 'pinia';
import {useProviderStore} from 'store/provider.js';

// eslint-disable-next-line import/prefer-default-export
export const useProviderProjectsStore = defineStore('providerProjectsStore', () => {
    const providerStore = useProviderStore();

    const projects = ref([]);
    const loading = ref(true);

    const canCreate = computed(() => providerStore.limitProjects > projects.value.length);
    const projectCount = computed(() => projects.value.length);

    function addProject(project) {
        projects.value.push(project);
    }

    function removeProject(removeId) {
        projects.value = projects.value.filter(({id}) => id !== removeId);
    }

    async function fetchProjects() {
        loading.value = true;

        const url = `${useRuntimeConfig().public.jwtApi}/projects`;
        try {
            const {data} = await useFetch(url, {
                method: 'get',
                headers: {
                    Authorization: providerStore.authHeaderValue,
                },
            });

            projects.value = data.value;
        } catch (e) {
            console.error(e);
        }

        loading.value = false;
    }

    function init() {
        fetchProjects();
    }

    return {
        canCreate,
        addProject,
        projectCount,
        projects,
        loading,
        init,
        removeProject,
    };
});
