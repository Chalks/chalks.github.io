<script>
export default {
    props: {
        interest: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            email: '',
        };
    },

    head: {
        script: [
            {
                src: "https://www.google.com/recaptcha/api.js",
            },
        ],
    },

    mounted() {
        window.recaptchaJank = this.onSubmit;
    },

    methods: {
        onSubmit(token) {
            this.$refs.interestForm.submit();
        },

        focus() {
            this.$refs.emailField.focus();
        },
    }
}
</script>
<template>
    <form
        ref="interestForm"
        class="prose mx-auto"
        action="https://api.formcake.com/api/form/ecbcefeb-9cb7-4d08-ad4d-c70e099d32aa/submission"
        method="post"
    >
        <h3>Interested in {{interest}}?</h3>

        <input type="hidden" name="honey" />

        <input
            type="hidden"
            name="interest"
            :value="interest"
        />

        <input
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Your Email Address"
        />

        <button
            class="g-recaptcha submit"
            data-sitekey="6Lf6IyUaAAAAAPTTe__sC4052VzvGcwFlBHeajA0"
            data-callback='recaptchaJank'
            data-action='submit'
        >
            I'M INTERESTED
        </button>
    </form>
</template>

