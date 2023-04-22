<script setup>
useHead({
    script: [{
        src: 'https://www.google.com/recaptcha/api.js',
    }],
});

const contactForm = ref(null);
const emailField = ref(null);
const email = ref('');
const message = ref('');

const onSubmit = () => { contactForm.value.submit(); };
const focus = () => { emailField.value.focus(); };

onMounted(() => {
    window.recaptchaJank = onSubmit;
    focus();
});
</script>

<template>
    <form
        ref="contactForm"
        class="prose mx-auto"
        action="https://api.formcake.com/api/form/1b7696ec-d768-4b77-ad1b-6b506428b336/submission"
        method="post"
    >
        <h3>Contact Me</h3>

        <input type="hidden" name="honey" />

        <input
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Your Email Address"
        />

        <input
            v-model="message"
            name="message"
            placeholder="Message"
        />

        <button
            class="g-recaptcha submit"
            data-sitekey="6Lf6IyUaAAAAAPTTe__sC4052VzvGcwFlBHeajA0"
            data-callback="recaptchaJank"
            data-action="submit"
        >
            Submit
        </button>
    </form>
</template>
