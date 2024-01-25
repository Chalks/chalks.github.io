export default ({
    pageTitle,
    telemetry = true,
    title = 'Jonathan Walters',
    description = 'I\'m a software engineer and I like to make fun stuff online. This is my personal website. Here be dragons.',
    imagePath = '/jdw-600x600.png',
    imageType = 'image/png',
    imageWidth = 600,
    imageHeight = 600,
    author = 'Jonathan Walters',
    published,
    type = 'website',
} = {}) => {
    const route = useRoute();
    const {origin} = useRuntimeConfig().public;
    const url = `${origin}${route.path}`.replace(/\/$/, '');
    const imageUrl = `${origin}${imagePath}`;

    const script = [];
    if (telemetry) {
        script.push({
            'src': 'https://cdn.telemetrydeck.com/websdk/telemetrydeck.min.js',
            'data-app-id': useRuntimeConfig().public.telemetryAppId,
        });
    }

    useHead({
        meta: [
            {hid: 'description', name: 'description', content: description},
        ],
        link: [
            {rel: 'canonical', href: url},
        ],
        script,
    });

    const seoMeta = {
        title: pageTitle ?? title,
        colorScheme: 'only light',
        themeColor: '#60a5fa',
        ogUrl: url,
        ogImage: {
            url: imageUrl,
            type: imageType,
            width: imageWidth,
            height: imageHeight,
        },
        ogTitle: title,
        ogDescription: description,
        ogType: type,
        twitterDescription: description,
        twitterTitle: title,
        twitterSite: '@chalksy',
        twitterImage: imageUrl,
    };

    if (type === 'article') {
        seoMeta.articleAuthor = author;
        if (published) {
            seoMeta.articlePublishedTime = published;
        }
    }

    useSeoMeta(seoMeta);
};
