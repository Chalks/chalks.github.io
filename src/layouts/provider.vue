<script setup>
import {useProviderStore} from 'store/provider.js';

const providerStore = useProviderStore();
</script>

<template>
    <div v-show="providerStore.authorized" class="prose mx-auto my-12 prose-blue px-4">
        <slot />
    </div>
</template>
