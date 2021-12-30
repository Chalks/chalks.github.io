<script>
export default {
    props: {
        requireEmail: {
            type: Boolean,
            default: false,
        },

        subject: {
            type: String,
            default: 'Generic error form',
        },

        messagePlaceholder: {
            type: String,
            default: 'Describe what happened',
        },

        submitText: {
            type: String,
            default: 'Report Error',
        },
    },

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
    },
};
</script>

<template>
    <form
        ref="errorForm"
        action="https://api.formcake.com/api/form/a5866167-1e7d-4aed-9898-2436a78b44df/submission"
        method="post"
    >
        <input type="hidden" name="honey" />

        <input type="hidden" name="subject" :value="subject" />

        <input
            v-if="requireEmail"
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Your email address"
        />

        <input
            v-model="message"
            name="message"
            :placeholder="messagePlaceholder"
        />

        <button
            class="g-recaptcha submit"
            data-sitekey="6Lf6IyUaAAAAAPTTe__sC4052VzvGcwFlBHeajA0"
            data-callback="recaptchaJank"
            data-action="submit"
        >
            {{ submitText }}
        </button>
    </form>
</template>

