import {useProviderStore} from 'store/provider.js';

export default defineNuxtRouteMiddleware(() => {
    if (process.server) return undefined;

    const providerStore = useProviderStore();
    if (!providerStore.authorized) {
        return navigateTo('/provider');
    }

    return undefined;
});
