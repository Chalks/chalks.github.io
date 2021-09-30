<script>
export default {
    data() {
        return {
            email: '',
            message: '',
        };
    },
}
</script>
<template>
    <form class="prose mx-auto">
        <h3>Contact Me</h3>

        <input type="hidden" name="honey" />

        <input
            v-model="email"
            type="text"
            name="email"
            placeholder="Your Email Address"
        />

        <textarea
            v-model="message"
            name="message"
            placeholder="Message"
        />

        <input type="submit" value="Contact" />
    </form>
</template>
