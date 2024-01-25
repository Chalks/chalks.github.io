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

    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/iconify.css',
        '~/assets/css/toastify.css',
    ],

    modules: [
        '@pinia/nuxt',
    ],

    app: {
        head: {
            title: 'Jonathan Walters',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
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
        'pages/provider/projects.vue',
        'pages/provider/settings.vue',
    ],

    runtimeConfig: {
        public: {
            authCookieName: 'auth',
            origin: process.env.NODE_ENV === 'production'
                ? 'https://jdw.me'
                : 'http://localhost:3000',
            jwtApi: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://seahorse-app-w4qv4.ondigitalocean.app',
        },
    },

    srcDir: 'src/',

    ssr: true,

    telemetry: false,
});
