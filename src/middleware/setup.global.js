import {useProviderStore} from 'store/provider.js';

export default defineNuxtRouteMiddleware(async () => {
    const providerStore = useProviderStore();

    if (!providerStore.user) {
        // if we don't have a user in state, try to get the user with cookies
        const authCookie = useCookie(useRuntimeConfig().public.authCookieName);

        if (authCookie.value) {
            // if we have a cookie value (the JWT) then get the user info
            const url = `${useRuntimeConfig().public.jwtApi}/auth/whoami`;

            try {
                const {data} = await useFetch(url, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${authCookie.value}`,
                    },
                });

                if (data.value) {
                    // if we got the user info, tell the store
                    providerStore.setUserWithToken({
                        user: data.value,
                        token: authCookie.value,
                    });
                }
            } catch (e) {
                // clear the cookie if anything went wrong
                console.error(e);
                authCookie.value = null;
            }
        }
    }
});

