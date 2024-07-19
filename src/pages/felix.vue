<script setup>
seo({
    title: 'Felix - Jonathan Walters',
});
</script>

<template>
    <div class="max-w-prose w-full flex mx-auto py-8">
        <div class="flex flex-wrap gap-tile">
            <a
                href="https://youtube.com"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
                target="_blank"
            >
                <img src="/kiddos/youtube.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="https://www.roblox.com/discover"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
                target="_blank"
            >
                <img src="/kiddos/roblox.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="https://www.roblox.com/games/262014008/Movie-Maker-3-OPEN-Beta"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
                target="_blank"
            >
                <img src="/kiddos/robloxmm3.png" class="object-cover group-hover:animate-wiggle" />
            </a>

            <a
                href="https://scratch.mit.edu/"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
                target="_blank"
            >
                <img src="/kiddos/scratch.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="https://musiclab.chromeexperiments.com/"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
            >
                <img src="/kiddos/musicbox.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="https://neal.fun/infinite-craft/"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
            >
                <img src="/kiddos/infinite-craft.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="steam://steam"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group"
            >
                <img src="/kiddos/steam.png" class="object-contain group-hover:animate-wiggle" />
            </a>

            <a
                href="https://chess.com"
                class="rounded-lg border bg-white prose-tile flex items-center justify-center p-1 shadow hover:shadow-lg group relative"
            >
                <img src="/kiddos/chesswhite.webp" class="group-hover:opacity-0 object-contain transition-opacity group-hover:animate-wiggle" />
                <img src="/kiddos/chess.webp" class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity object-contain group-hover:animate-wiggle" />
            </a>
        </div>
    </div>

    <div class="fixed right-2 bottom-2">
        <p class="text-gray-400 text-sm">Version 0.5.1</p>
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

