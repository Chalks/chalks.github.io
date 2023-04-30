<script setup>
import DeleteProjectForm from '~/components/provider/DeleteProjectForm.vue';

const props = defineProps({
    project: {type: Object, required: true},
});

const created = ref(new Date(props.project.createdAt).toLocaleDateString());
const updated = ref(new Date(props.project.updatedAt).toLocaleDateString());
</script>

<template>
    <div class="shadow-md px-4 border rounded">
        <p
            class="uppercase text-sm font-bold truncate"
            :title="props.project.name"
        >
            {{ props.project.name }}
        </p>

        <ul class="list-disc">
            <li>Created <strong>{{ created }}</strong></li>
            <li>Updated <strong>{{ updated }}</strong></li>
        </ul>

        <DeleteProjectForm :id="props.project.id" class="mb-4" />
    </div>
</template>
