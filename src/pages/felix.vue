<script setup>
seo({
    title: 'Felix - Jonathan Walters',
});
</script>

<template>
    <div class="flex flex-col gap-96 justify-center items-center py-8">
        <div class="flex items-center justify-center gap-96">
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
        <div class="flex items-center justify-center gap-96">
            <a
                href="https://scratch.mit.edu/"
                class="rounded-lg border bg-white w-24 h-24 flex items-center justify-center p-1 shadow hover:shadow-lg group"
                target="_blank"
            >
                <img src="/kiddos/scratch.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="steam://steam"
                class="rounded-lg border bg-white w-24 h-24 flex items-center justify-center p-1 shadow hover:shadow-lg group"
            >
                <img src="/kiddos/steam.png" class="object-contain group-hover:animate-wiggle" />
            </a>
        </div>
    </div>
</template>

<style>
    body {
        background: url("/kiddos/monalisa.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }
</style>

