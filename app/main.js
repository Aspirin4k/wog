import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import app from './components/app.vue';
import config from './config.json';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cards: []
    },
    mutations: {
        queryCards(state, param) {
            axios.get(config.apiUrl, {
                params: param
            })
            .then(
                    (res) => {
                        state.cards = res.data;
                        console.log(state.cards);
                    })
        }
    }
})

new Vue({
    el: '#app',
    store,
    components: {
        'app': app
    }
})