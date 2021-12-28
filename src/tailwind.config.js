module.exports = {
    purge: [],

    darkMode: false, // or 'media' or 'class'

    theme: {
        container: {
            padding: '2rem',
        },

        extend: {},
    },

    variants: {
        extend: {},
    },

    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/typography'),
    ],
};
