module.exports = {
    content: [
        './src/components/**/*.{js,vue,ts}',
        './src/layouts/**/*.vue',
        './src/pages/**/*.vue',
        './src/app.vue',
        './src/error.vue',
    ],

    darkMode: 'class',

    theme: {
        container: {
            padding: '2rem',
        },

        extend: {
            animation: {
                wiggle: 'wiggle 3s ease-in-out infinite',
            },
            keyframes: {
                wiggle: {
                    '0%': {transform: 'rotate(0deg)'},
                    '12%': {transform: 'rotate(-5deg)'},
                    '24%': {transform: 'rotate(5deg)'},
                    '36%': {transform: 'rotate(-5deg)'},
                    '48%': {transform: 'rotate(0deg)'},
                    '100%': {transform: 'rotate(0deg)'},
                },
            },
        },
    },

    variants: {
        extend: {},
    },

    plugins: [
        // eslint-disable-next-line
        require('@tailwindcss/typography'),
    ],
};
