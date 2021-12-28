<script>
export default {
    data() {
        return {
            email: '',
            message: '',
        };
    },

    head: {
        script: [
            {
                src: 'https://www.google.com/recaptcha/api.js',
            },
        ],
    },

    mounted() {
        window.recaptchaJank = this.onSubmit;
    },

    methods: {
        onSubmit() {
            this.$refs.errorForm.submit();
        },

        focus() {
            this.$refs.emailField.focus();
        },
    },
};
</script>

<template>
    <form
        ref="errorForm"
        class="prose mx-auto"
        action="https://api.formcake.com/api/form/a5866167-1e7d-4aed-9898-2436a78b44df/submission"
        method="post"
    >
        <h3>Whoops, something broke</h3>
        <p>Let me know what happened please!</p>

        <input type="hidden" name="honey" />

        <input
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Your email address"
        />

        <input
            v-model="message"
            name="message"
            placeholder="Describe what happened!"
        />

        <button
            class="g-recaptcha submit"
            data-sitekey="6Lf6IyUaAAAAAPTTe__sC4052VzvGcwFlBHeajA0"
            data-callback="recaptchaJank"
            data-action="submit"
        >
            Report Error
        </button>
    </form>
</template>

