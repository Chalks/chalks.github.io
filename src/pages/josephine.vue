<script setup>
useHead(() => ({
    title: 'Josephine - Jonathan Walters',
}));
</script>

<template>
    <div class="flex flex-col gap-8 justify-center items-center py-8">
        <a
            href="https://youtube.com"
            class="rounded-lg border bg-white w-24 h-24 flex items-center justify-center p-1 shadow hover:shadow-lg group"
            target="_blank"
        >
            <img src="/kiddos/youtube.png" class="object-contain group-hover:animate-wiggle" />
        </a>

        <a
            href="https://www.roblox.com/discover"
            class="rounded-lg border bg-white w-24 h-24 flex items-center justify-center p-1 shadow hover:shadow-lg group"
            target="_blank"
        >
            <img src="/kiddos/roblox.png" class="object-contain group-hover:animate-wiggle" />
        </a>
    </div>
</template>

<style>
    body {
        background: url("/kiddos/unicorn1.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: cover;
    }
</style>
