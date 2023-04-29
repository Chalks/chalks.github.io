<script setup>
import {useProviderStore} from 'store/provider.js';

const providerStore = useProviderStore();
</script>

<template>
    <div v-show="providerStore.authorized">
        <slot />
    </div>
</template>
