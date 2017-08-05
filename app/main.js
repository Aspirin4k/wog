import Vue from 'vue';
import app from './app.vue';

console.log(app);

new Vue({
    el: '#app',
    components: {
        'app': app
    }
})