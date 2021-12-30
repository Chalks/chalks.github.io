<script>
import ErrorForm from '~/components/ErrorForm.vue';

export default {
    components: {
        ErrorForm,
    },
};
</script>

<template>
    <div class="prose container my-12 mx-auto">
        <h3>Uh Oh, Something Broke</h3>
        <p>
            It would help me out a bunch if you let me know what happened. Thanks
            for taking the time!
        </p>
        <ErrorForm require-email />
    </div>
</template>

