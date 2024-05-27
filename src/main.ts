// Styles
import '@/assets/tailwind.css';
import 'primevue/resources/themes/aura-light-indigo/theme.css';

import App from '@/App.vue';

import { createApp } from 'vue';

import { i18n } from '@/locale';
import { router } from '@/router';
import { pinia } from '@/store';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(pinia).use(i18n).use(router).use(PrimeVue).use(ConfirmationService).use(Vue3Toasity);

app.mount('#app');
