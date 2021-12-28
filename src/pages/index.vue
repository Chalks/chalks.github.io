<script>
import ContactForm from '~/components/ContactForm.vue';

export default {
    components: {
        ContactForm,
    },

    methods: {
        focusContact() {
            this.$refs.contactForm.focus();
        },
    },
};
</script>
<template>
    <div class="prose mx-auto prose-red">
        <h1>Hi, I'm Jonathan Walters</h1>

        <p>I build teams that deliver fantastic product. When I'm not running a dev team I'm building frontend. This website is built entirely without any backend architecture using:</p>

        <ul>
            <li><a href="https://vuejs.org/">Vue</a> - Just playing with different frameworks, branching out from React</li>
            <li><a href="https://nuxtjs.org/">NuxtJS</a> - Something has to generate static files</li>
            <li><a href="https://tailwindcss.com/">Tailwind CSS</a> - CSS is dead, long live Tailwind</li>
            <li><a href="https://www.netlify.com/">Netlify</a> - Fast and free static hosting</li>
            <li><a href="https://formcake.com">Formcake</a> - Easy form backend (I made this!)</li>
            <li><a href="https://github.com/Chalks/chalks.github.io">This page's source code</a> - I made this too</li>
        </ul>

        <ContactForm ref="contactForm" />
    </div>
</template>
