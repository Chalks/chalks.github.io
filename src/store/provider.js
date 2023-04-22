import {defineStore} from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useProviderStore = defineStore('providerStore', () => {
    const testState = ref('foobar');

    const test = computed(() => testState);

    function change() {
        testState.value = testState.value === 'foobar' ? 'barfoo' : 'foobar';
    }

    return {test, change};
});