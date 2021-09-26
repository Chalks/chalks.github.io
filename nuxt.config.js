export default () => ({
    buildModules: ['@nuxtjs/tailwindcss'],

    css: [
        {src: `~/assets/css/tailwind.css`},
    ],

    srcDir: 'src/',

    target: 'static',

    telemetry: false,
});