<template>
    <div class="cube">
        <a href="https://youtube.com/feed/subscriptions" target="_blank">YOUTUBE.COM</a>
        <a href="https://old.reddit.com" target="_blank">REDDIT.COM</a>
        <a href="https://lichess.org" target="_blank">LICHESS.ORG</a>
        <a href="https://alt.org/nethack/" target="_blank">NETHACK</a>
        <a href="https://tagpro.gg" target="_blank">TAGPRO.GG</a>
        <a href="https://teamwood.itch.io/super-auto-pets" target="_blank">SUPER.AUTO.PETS</a>
        <a href="https://facebook.com" target="_blank">FACEBOOK.COM</a>
    </div>
</template>

<style scoped>
    .cube {
        @apply absolute break-all z-50 text-center;
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 270px;
        line-height: 34px;
    }

    a {
        @apply bg-gray-400 text-white transition-colors;

        font-family: 'Cousine', monospace;
        font-weight: 600;
        padding: 0 2px;
        font-size: 28px;
        margin: 0 0px 0 0;

        &:hover {
            @apply bg-gray-900;
        }
    }
</style>