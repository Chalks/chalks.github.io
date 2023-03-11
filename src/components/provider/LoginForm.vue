<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },

    head: {
    },

    mounted() {
    },

    methods: {
        onSubmit() {
            console.log('will post to:', this.$config.jwtApi);
            // this.$refs.loginForm.submit();
            /*
                if (res && res.data.token) {
                    document.cookie = `fcut=${res.data.token}; path=/; domain=${process.env.DOMAIN};`;

                    const {query} = url.parse(window.location.href, true);
                    window.location.href = query.next && !query.next.includes('/logout')
                        ? query.next
                        : '/forms';
            */
        },

        focus() {
            this.$refs.emailField.focus();
        },
    },
};
</script>

<template>
    <form
        ref="loginForm"
        class="prose mx-auto"
        action="#"
        method="post"
        @submit.prevent="onSubmit"
    >
        <h3>Contact Me</h3>

        <input
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
        />

        <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
        />

        <input
            type="submit"
            value="Submit"
        />
    </form>
</template>
