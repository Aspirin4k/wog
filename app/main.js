import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import vuexI18n from 'vuex-i18n';

import app from './components/app.vue';
import config from './config.json';
import ru from './resources/translations/ru.json';

import missionList from './components/pages/mission-list/mission-list.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

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
                    })
        }
    }
});

// Интернационализация в данном случае нужно только лишь для сопоставления 
// английских значений из бд с русскими.
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('ru', ru);
Vue.i18n.set('ru');

const router = new VueRouter({
    routes: [
        { path: '/', component: missionList }
    ]
});

new Vue({
    el: '#app',
    store,
    router,
    components: {
        'app': app
    }
})