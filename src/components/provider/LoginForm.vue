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
            }).then(({token, user}) => {
                this.$emit('success', {token, user});
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
        <h3>Login</h3>

        <label for="login-email">Email</label>
        <input
            id="login-email"
            ref="emailField"
            v-model="email"
            type="text"
            name="email"
            placeholder="Email"
        />

        <label for="login-password">Password</label>
        <input
            id="login-password"
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
