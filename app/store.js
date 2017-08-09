import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import axios from 'axios';

import config from './config.json';
import ru from './resources/translations/ru.json';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cards: [],
        selector: {},
        ajaxLoading: false
    },
    mutations: {
        addQueryParam(state, param) {
            state.selector[param.prop] = param.val;
        },
        removeQueryParam(state, param) {
            delete state.selector[param];
        }
    },
    actions: {
        queryCards(context) {
            context.state.ajaxLoading = true;
            axios.get(config.apiUrl, {
                    params: context.state.selector
                })
                .then(
                    (res) => {
                        context.state.cards = res.data;
                        context.state.ajaxLoading = false;
                    })
                .catch(
                    (res) => {
                        context.state.ajaxLoading = false;
                    }
                )
        }
    }
});

// Интернационализация в данном случае нужно только лишь для сопоставления 
// английских значений из бд с русскими.
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('ru', ru);
Vue.i18n.set('ru');

export default store;