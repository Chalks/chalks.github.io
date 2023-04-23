import {useProviderStore} from 'store/provider.js';

export default defineNuxtRouteMiddleware(() => {
    const providerStore = useProviderStore();
    if (!providerStore.authorized) {
        return navigateTo('/provider');
    }

    return undefined;
});
