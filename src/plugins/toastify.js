import Vue3Toasity, {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import {defineNuxtPlugin} from '#app';


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(
        Vue3Toasity,
        {
            autoClose: 3000,
            limit: 5,
            position: toast.POSITION.BOTTOM_LEFT,
            transition: toast.TRANSITIONS.FLIP,
            style: {
                left: '0.75rem',
                bottom: '1.50rem',
                maxWidth: 'calc(100% - 1.5rem)',
            },
        },
    );
});
