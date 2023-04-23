import {defineStore} from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useProviderStore = defineStore('providerStore', () => {
    // todo change to the other version of pinia stores https://pinia.vuejs.org/core-concepts/
    const userState = ref(null);
    const tokenState = ref(null);
    const tokenExpiryState = ref(0);

    const user = computed(() => userState);
    const token = computed(() => tokenState);
    const tokenExpiry = computed(() => tokenExpiryState);

    // todo this doesn't appear to be reactive
    const isTokenExpired = computed(() => new Date().getTime() > tokenExpiryState.value * 1000);

    function setUserWithToken({user: u, token: t}) {
        userState.value = u;
        tokenState.value = t;

        try {
            const payload = JSON.parse(window.atob(t.split('.')[1]));
            tokenExpiryState.value = payload.exp;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('error decoding jwt', e);
            tokenExpiry.value = 0;
        }
    }

    return {
        user,
        token,
        tokenExpiry,
        isTokenExpired,
        setUserWithToken,
    };
});