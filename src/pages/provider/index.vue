<script setup>
import {useProviderStore} from 'store/provider.js';
import LoginForm from '~/components/provider/LoginForm.vue';
import RegisterForm from '~/components/provider/RegisterForm.vue';

const loaded = ref(false);
const loginForm = ref(null);
const providerStore = useProviderStore();

onMounted(() => {
    if (providerStore.authorized) {
        navigateTo('/provider/dashboard');
    } else {
        loaded.value = true;
        loginForm.value.focus();
    }
});

const loginErrors = ref([]);
const registerErrors = ref([]);

const getMessagesFromError = (e) => {
    if (e.data && e.data.errors) {
        return e.data.errors.map(({msg}) => msg);
    }

    if (e.data && e.data.message) {
        return [e.data.message];
    }

    return ['Unknown error, try again'];
};

const handleRegisterError = (e) => {
    registerErrors.value = getMessagesFromError(e);
    console.error(e);
};

const handleLoginError = (e) => {
    loginErrors.value = getMessagesFromError(e);
    console.error(e);
};

const handleSuccess = () => {
    navigateTo('/provider/dashboard');
    loginErrors.value = [];
    registerErrors.value = [];
};
</script>

<template>
    <div v-show="loaded" class="prose mx-auto my-12 prose-blue px-4">
        <h1>JWT Provider</h1>

        <p>
            This is a simple <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">JWT</a>
            provider I wrote for myself. With an account you can have projects that support a number of
            end users as specified by your account plan. The API exposes just a few auth endpoints, including
            login, logout, register, and token invalidation. You can then use those JWTs on any static site
            and get access to a very basic json store for each end user.
        </p>

        <div class="flex flex-wrap">
            <div class="w-full pr-0 lg:w-1/2 lg:pr-2">
                <p
                    v-for="(loginError, index) in loginErrors"
                    :key="`${index}-login-error`"
                    class="text-red-600"
                >
                    {{ loginError }}
                </p>

                <LoginForm
                    ref="loginForm"
                    @error="handleLoginError"
                    @success="handleSuccess"
                />
            </div>

            <div class="w-full pl-0 mt-8 lg:w-1/2 lg:pl-2 lg:mt-0">
                <p
                    v-for="(registerError, index) in registerErrors"
                    :key="`${index}-register-error`"
                    class="text-red-600"
                >
                    {{ registerError }}
                </p>

                <RegisterForm
                    @error="handleRegisterError"
                    @success="handleSuccess"
                />
            </div>
        </div>
    </div>
</template>
