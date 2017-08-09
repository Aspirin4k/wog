import Vue from 'vue';

import app from './components/app.vue';
import store from './store.js';
import router from './router.js';

new Vue({
    el: '#app',
    store,
    router,
    components: {
        'app': app
    }
})