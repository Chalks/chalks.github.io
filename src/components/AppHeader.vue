<script setup>
import {Icon} from '@iconify/vue';
</script>

<template>
    <div
        class="
            sticky
            md:fixed
            top-0
            bg-gray-700
            flex
            flex-row
            md:flex-col
            gap-4
            items-center
            pl-4
            mb-2
            md:pl-0
            md:pt-4
            text-white
            rounded-bl-full
            rounded-tr-full
            rounded-br-full
            overflow-hidden
            h-12
            w-fit
            md:w-12
            md:h-auto
        "
    >
        <NuxtLink to="/resume" class="hover:text-blue-300 transition-colors">
            <Icon icon="tabler:file-cv" />
        </NuxtLink>

        <NuxtLink to="/links" class="hover:text-blue-300 transition-colors">
            <Icon icon="carbon:network-2" />
        </NuxtLink>

        <NuxtLink to="/blog" class="hover:text-blue-300 transition-colors">
            <Icon icon="fluent-emoji-high-contrast:writing-hand" />
        </NuxtLink>

        <NuxtLink
            to="/"
            class="
                rounded-full
                h-full
                w-12
                md:h-auto
                md:w-full
                overflow-hidden
                border-4
                border-gray-700
                hover:animate-spin
                transition-colors
            "
        >
            <img src="/favicon-96x96.png" class="object-cover" />
        </NuxtLink>
    </div>
</template>

<style scoped>
</style>
