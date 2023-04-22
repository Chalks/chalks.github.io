<script setup>
const year = ref(new Date().getFullYear());
</script>

<template>
    <div class="p-4">
        <p class="muted">Copyright Jonathan Walters © {{ year }}</p>
    </div>
</template>
