import {defineStore} from 'pinia';
import {useProviderStore} from 'store/provider.js';

// eslint-disable-next-line import/prefer-default-export
export const useProviderProjectsStore = defineStore('providerProjectsStore', () => {
    const providerStore = useProviderStore();

    const projects = ref([]);
    const loading = ref(true);
    const currentProjectId = ref(null);

    const canCreate = computed(() => providerStore.limitProjects > projects.value.length);
    const projectCount = computed(() => projects.value.length);
    const projectMap = computed(() => projects.value.reduce((acc, project) => {
        acc[project.id] = project;
        return acc;
    }, {}));
    const currentProject = computed(() => projectMap.value?.[currentProjectId.value] ?? null);

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
        currentProject,
        currentProjectId,
        addProject,
        projectCount,
        projectMap,
        projects,
        loading,
        init,
        removeProject,
    };
});
