<script setup>
defineProps({
    left: {
        type: Boolean,
        default: false,
    },
    right: {
        type: Boolean,
        default: false,
    },

    sideOnly: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div
        class="relative"
        :class="{
            'hidden': sideOnly,
            'lg:block': sideOnly,
            'lg:left-0': left,
            'lg:right-0': right,
            'lg:pl-8': left,
            'lg:pr-4': left,
            'lg:pl-4': right,
            'lg:pr-8': right,
            'lg:max-w-side': left || right,
            'lg:absolute': left || right,
        }"
    >
        <slot />
    </div>
</template>

