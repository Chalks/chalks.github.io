<script setup>
const url = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');
const title = 'Jonathan Walters';
const description = 'I\'m a software engineer who likes to make fun stuff online and this is my personal website. Here be dragons.';
const image = `${window.location.origin}/jdw-600x600.png`;

useHead({
    meta: [
        {hid: 'description', name: 'description', content: description},
    ],
    link: [
        {rel: 'canonical', href: url},
    ],
});

useSeoMeta({
    colorScheme: 'only light',
    themeColor: '#60a5fa',
    ogUrl: url,
    ogImage: {
        url: image,
        type: 'image/png',
        width: 600,
        height: 600,
    },
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    twitterDescription: description,
    twitterTitle: title,
    twitterSite: '@chalksy',
});
</script>
<template>
    <div>
        <slot />
    </div>
</template>

