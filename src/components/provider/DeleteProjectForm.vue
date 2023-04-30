<script setup>
import {toast} from 'vue3-toastify';
import {Icon} from '@iconify/vue';
import {useProviderStore} from 'store/provider.js';
import {useProviderProjectsStore} from 'store/providerProjects.js';

const emit = defineEmits(['success', 'error']);
const providerStore = useProviderStore();
const providerProjectsStore = useProviderProjectsStore();

const props = defineProps({
    id: {type: String, required: true},
});

const step = ref(0);

const onSubmit = async () => {
    const url = `${useRuntimeConfig().public.jwtApi}/projects/${props.id}`;
    try {
        await $fetch(url, {
            method: 'delete',
            headers: {
                Authorization: providerStore.authHeaderValue,
            },
        });

        providerProjectsStore.removeProject(props.id);
        toast.info('Project deleted');
        emit('success');
    } catch (e) {
        emit('error', e);
    }
};

const progress = () => {
    step.value += 1;

    switch (step.value) {
        case 1:
            toast.warn('Click four more times to permanently delete project.');
            break;
        case 4:
            toast.error('Deleting a project is permanent and irreversible!');
            break;
        case 5:
            onSubmit();
            break;
        // no default
    }
};

const cancel = () => {
    step.value = 0;
};
</script>

<template>
    <div class="flex items-center flex-wrap space-x-4 font-2xl">
        <button
            class="delete-submit"
            @click="progress"
        >
            Delete
        </button>

        <div v-if="step > 0" class="flex-grow flex justify-around">
            <Icon
                icon="solar:bomb-emoji-bold-duotone"
                :class="{
                    'text-red-500': step > 0,
                    'animate-pulse': true,
                }"
            />

            <Icon
                icon="solar:bomb-emoji-bold-duotone"
                :class="{
                    'text-gray-400': step <= 1,
                    'text-red-500': step > 1,
                    'animate-pulse': step > 1,
                }"
            />

            <Icon
                icon="solar:bomb-emoji-bold"
                :class="{
                    'text-gray-400': step <= 2,
                    'text-red-500': step > 2,
                    'animate-pulse': step > 2,
                }"
            />

            <Icon
                icon="game-icons:spiky-explosion"
                :class="{
                    'text-gray-400': step <= 3,
                    'text-red-500': step > 3,
                    'animate-pulse': step > 3,
                }"
            />
        </div>

        <button
            v-if="step > 0"
            class="delete-cancel"
            @click="cancel"
        >
            Cancel
        </button>
    </div>
</template>

<style scoped>
    .delete-submit {
        @apply w-auto mb-0 text-white border-red-700 bg-red-500 hover:bg-red-700;
    }

    .delete-cancel {
        @apply w-auto mb-0 text-white border-gray-700 bg-gray-500 hover:bg-gray-700;
    }

    .iconify {
        @apply text-3xl;
    }
</style>
