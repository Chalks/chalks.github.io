<script>
import InterestForm from '~/components/InterestForm.vue';

export default {
    components: {
        InterestForm,
    },
};
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="pillar mb-4">
            <h1 class="pillar-word">Hi</h1>
            <p class="pillar-word">I love ya Tagpro bbs</p>
            <h2 class="pillar-word">I'm working on the Tagpro Themer</h2>
            <p class="pillar-word">Let me know you want it!</p>
        </div>

        <InterestForm interest="the Tagpro Themer" />
    </div>
</template>
