<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },

    blogPath: {
        type: String,
        required: true,
    },

    imagePath: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div class="prose prose-red">
        <h3 class="peer inline-block mt-0">
            <NuxtLink :to="blogPath">{{ title }}</NuxtLink>
        </h3>

        <div class="flex gap-4 items-stretch not-prose rounded-l-xl overflow-hidden peer-hover:rounded-l-none transition-all">
            <img :src="imagePath" class="object-cover max-w-[20%]" />
            <p>
                <slot name="default" />
            </p>
        </div>

        <div class="flex items-center not-prose mt-[0.6rem]">
            <p class="text-xs">
                <strong>{{ date }}</strong>
            </p>
        </div>
    </div>
</template>

