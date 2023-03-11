<script>
export default {
    emits: ['success', 'error'],

    data() {
        return {
            email: '',
            password: '',
        };
    },

    methods: {
        onSubmit() {
            const url = `${this.$config.jwtApi}/auth/login`;
            $fetch(url, {
                method: 'post',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            }).then(({token}) => {
                this.$emit('success', token);
            }).catch((error) => {
                this.focus();
                this.$emit('error', error);
            });
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
