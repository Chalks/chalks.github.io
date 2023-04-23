<script setup>
import LoginForm from '~/components/provider/LoginForm.vue';

const loginForm = ref(null);

onMounted(() => {
    loginForm.value.focus();
});

const errorMessages = ref([]);

const handleError = (e) => {
    if (e.data && e.data.errors) {
        errorMessages.value = e.data.errors.map(({msg}) => msg);
    } else if (e.data && e.data.message) {
        errorMessages.value = [e.data.message];
    } else {
        errorMessages.value = ['Unknown error, try again'];
    }
    console.error(e);
};

const handleSuccess = () => {
    navigateTo('/provider/dashboard');
    errorMessages.value = [];
};
</script>

<template>
    <div class="prose mx-auto my-12 prose-red">
        <h1>JWT Provider</h1>
        <p
            v-for="(errorMessage, index) in errorMessages"
            :key="`${index}-err`"
            class="text-red-600"
        >
            {{ errorMessage }}
        </p>
        <LoginForm ref="loginForm" @error="handleError" @success="handleSuccess" />
    </div>
</template>
