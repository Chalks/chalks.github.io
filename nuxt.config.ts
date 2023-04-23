import {resolve} from 'path';

export default defineNuxtConfig({
    alias: {
        store: resolve(__dirname, './src/store'),
    },

    devServer: {
        host: '127.0.0.1',
    },

    postcss: {
        plugins: {
            'tailwindcss/nesting': {},
            'tailwindcss': {},
            'autoprefixer': {},
        },
    },

    css: ['~/assets/css/tailwind.css'],

    modules: [
        '@pinia/nuxt',
    ],

    app: {
        head: {
            title: 'Jonathan Walters',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid: 'description', name: 'description', content: 'Jon has things to say.'},
                {hid: 'og-title', property: 'og:title', content: 'Jonathan Walters'},
                {hid: 'og-description', property: 'og:description', content: 'Jon has things to say.'},
                {hid: 'og-type', property: 'og:type', content: 'website'},
                {hid: 'og-site_name', property: 'og:og-site_name', content: 'Jonathan Walters'},
                {hid: 'twitter-title', property: 'twitter:title', content: 'Jonathan Walters'},
                {hid: 'twitter-description', property: 'twitter:description', content: 'Jon has things to say.'},
                {hid: 'twitter-site', property: 'twitter:site', content: 'formcake.com'},
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16x16.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32x32.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '96x96',
                    href: '/favicon-96x96.png',
                },
            ],
        },
    },

    ignore: [
        process.env.NODE_ENV === 'production' ? 'pages/tpthemer/upload.vue' : '',
    ],

    runtimeConfig: {
        public: {
            authCookieName: 'auth',
            jwtApi: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://seahorse-app-w4qv4.ondigitalocean.app',
        },
    },

    srcDir: 'src/',

    target: 'static',

    telemetry: false,
});
