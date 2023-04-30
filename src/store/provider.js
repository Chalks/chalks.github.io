import {defineStore} from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useProviderStore = defineStore('providerStore', () => {
    const user = ref(null);
    const token = ref(null);
    const tokenExpiry = ref(0);

    const isTokenExpired = computed(() => new Date().getTime() > tokenExpiry.value * 1000);
    const authorized = computed(() => user.value && !isTokenExpired.value);
    const authHeaderValue = computed(() => `Bearer ${token.value}`);
    const plan = computed(() => user.value?.plan ?? {});
    const limitProjects = computed(() => plan.value?.limitProjects ?? 0);
    const limitUsersPerProject = computed(() => plan.value?.limitUsersPerProject ?? 0);

    function setUserWithToken({user: u, token: t}) {
        user.value = u;
        token.value = t;

        try {
            const atob = process.client
                ? window.atob
                : (data) => Buffer.from(data, 'base64').toString('ascii');

            // read the jwt payload expiration
            const payload = JSON.parse(atob(t.split('.')[1]));
            tokenExpiry.value = payload.exp;

            // set the cookie for the token to stay logged in
            const authCookie = useCookie(useRuntimeConfig().public.authCookieName, {
                expires: new Date(payload.exp * 1000),
                sameSite: true,
            });
            authCookie.value = t;
        } catch (e) {
            console.error('error decoding jwt', e);

            tokenExpiry.value = 0;

            const authCookie = useCookie(useRuntimeConfig().public.authCookieName, {sameSite: true});
            authCookie.value = null;
        }
    }

    function setToken(t) {
        if (authorized.value) {
            setUserWithToken({user: user.value, token: t});
        }
    }

    async function logout() {
        if (token.value) {
            const url = `${useRuntimeConfig().public.jwtApi}/auth/logout`;
            try {
                await useFetch(url, {
                    method: 'get',
                    headers: {
                        Authorization: authHeaderValue.value,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        }

        user.value = null;
        token.value = null;
        tokenExpiry.value = 0;
        const authCookie = useCookie(useRuntimeConfig().public.authCookieName, {sameSite: true});
        authCookie.value = null;
    }

    return {
        authorized,
        authHeaderValue,
        user,
        plan,
        token,
        tokenExpiry,
        isTokenExpired,
        setUserWithToken,
        setToken,
        logout,
        limitProjects,
        limitUsersPerProject,
    };
});
