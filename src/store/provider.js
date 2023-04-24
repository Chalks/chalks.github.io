import {defineStore} from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useProviderStore = defineStore('providerStore', () => {
    const userState = ref(null);
    const tokenState = ref(null);
    const tokenExpiryState = ref(0);

    const user = computed(() => userState.value);
    const token = computed(() => tokenState.value);
    const tokenExpiry = computed(() => tokenExpiryState.value);
    const isTokenExpired = computed(() => new Date().getTime() > tokenExpiryState.value * 1000);
    const authorized = computed(() => userState.value && !isTokenExpired.value);

    function setUserWithToken({user: u, token: t}) {
        userState.value = u;
        tokenState.value = t;

        try {
            const atob = process.client
                ? window.atob
                : (data) => Buffer.from(data, 'base64').toString('ascii');

            // read the jwt payload expiration
            const payload = JSON.parse(atob(t.split('.')[1]));
            tokenExpiryState.value = payload.exp;

            // set the cookie for the token to stay logged in
            const authCookie = useCookie(useRuntimeConfig().public.authCookieName, {
                expires: new Date(payload.exp * 1000),
                sameSite: true,
            });
            authCookie.value = t;
        } catch (e) {
            console.error('error decoding jwt', e);

            tokenExpiry.value = 0;

            const authCookie = useCookie(useRuntimeConfig().public.authCookieName);
            authCookie.value = null;
        }
    }

    async function logout() {
        if (tokenState.value) {
            const url = `${useRuntimeConfig().public.jwtApi}/auth/logout`;
            try {
                await useFetch(url, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${tokenState.value}`,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        }

        userState.value = null;
        tokenState.value = null;
        tokenExpiryState.value = 0;
        const authCookie = useCookie(useRuntimeConfig().public.authCookieName);
        authCookie.value = null;
    }

    return {
        authorized,
        user,
        token,
        tokenExpiry,
        isTokenExpired,
        setUserWithToken,
        logout,
    };
});
