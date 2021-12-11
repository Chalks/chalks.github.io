<template>
    <div class="trigger">
        <div class="header top-0 left-0 md:top-4 md:left-4">
            <NuxtLink to="/"><img src="/favicon-96x96.png" /></NuxtLink>
            <NuxtLink to="/resume">Resume</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
    .trigger {
        @apply fixed top-0 left-0 z-50;
        height: calc(1rem + 36px);
        width: calc(1rem + 36px + 50px);
    }

    .trigger:hover .header {
        animation: rotate 0.2s ease forwards;
    }

    .trigger:hover img {
        animation: reverseRotate 0.2s ease forwards;
    }

    @media (hover: none) {
        .trigger {
            top: -100%;
        }

        .header {
            right: 0;
            left: unset !important;
            transform: rotate(0) !important;
        }

        img {
            transform: rotate(0) !important;
        }
    }

    .header {
        @apply
            fixed
            bg-gray-700
            z-50
            space-x-4
            transition-colors
            rounded-l-full
            flex
            items-center;

        padding: 2px;
        padding-right: 1rem;

        transform: rotate(-90deg);
        transform-origin: 18px 50%;
    }

    img {
        @apply rounded-full;
        width: 32px;
        height: 32px;
        transform-origin: 50% 50%;
        margin-right: 1px;
        transform: rotate(90deg);
    }

    a {
        @apply text-gray-200 transition-colors;

        &:hover {
            @apply text-gray-50;
        }
    }

    @keyframes rotate {
        0% { transform: rotate(-90deg); }
        30% { transform: rotate(-90deg); }
        100% { transform: rotate(0); }
    }

    @keyframes reverseRotate {
        0% { transform: rotate(90deg); }
        30% { transform: rotate(90deg); }
        100% { transform: rotate(0); }
    }
</style>
