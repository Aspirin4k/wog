import Vue from 'vue';
import VeeValidate from 'vee-validate';

import app from './components/app.vue';
import store from './store.js';
import router from './router.js';

const veeConfig = {
    locale: 'ru',
    dictionary: {
        ru: {
            messages: {
                required: 'Это поле обязательно!'
            }
        }
    }
}

Vue.use(VeeValidate, veeConfig);

new Vue({
    el: '#app',
    store,
    router,
    components: {
        'app': app
    }
})