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
        ajaxLoading: false,
        modal_messages: [],
        filters: [],
        detail_mission: {}
    },
    mutations: {
        // Добавляет сообщение для вывода в модальном окне
        pushModalMessage(state, params) {
            // В случае если мы хотим показывать только одно сообщение данного типа (если вызвано несколько)
            if (params.id) {
                let firstIndex = state.modal_messages.findIndex((element) => {
                    return element.id === params.id });
                if (firstIndex !== -1)
                {
                    state.modal_messages.splice(firstIndex, 1, {
                        id: params.id,
                        msg: params.msg,
                        title: params.title,
                        // Действие на кнопку ОК
                        onOk: params.onOk ? () => {
                            params.onOk(params.onOkArgs);
                            state.modal_messages.splice(0,1);
                        } : () => {
                            state.modal_messages.splice(0,1);
                        },
                        // Действие на кнопку Отмена. если его нет, то кнопки не будет
                        onCancel: params.onCancel ? () => {
                            params.onCancel(params.onCancelArgs);
                            state.modal_messages.splice(0,1);
                        } : null
                    });
                    return;
                }
            }

            state.modal_messages.push({
                id: params.id,
                msg: params.msg,
                title: params.title,
                // Действие на кнопку ОК
                onOk: params.onOk ? () => {
                    params.onOk(params.onOkArgs);
                    state.modal_messages.splice(0,1);
                } : () => {
                    state.modal_messages.splice(0,1);
                },
                // Действие на кнопку Отмена. если его нет, то кнопки не будет
                onCancel: params.onCancel ? () => {
                    params.onCancel(params.onCancelArgs);
                    state.modal_messages.splice(0,1);
                } : null
            });
        },
        clearModalMessages(state) {
            state.modal_messages.splice(0, state.modal_messages.length);
        },
        addQueryParam(state, param) {
            state.selector[param.prop] = param.val;

            state.filters = [];
            for (let propName in state.selector)
                state.filters.push({prop: propName, val: state.selector[propName]});
        },
        removeQueryParam(state, param) {
            delete state.selector[param];

            state.filters = [];
            for (let propName in state.selector)
                state.filters.push({prop: propName, val: state.selector[propName]});
        },
        setLoading(state, val) {
            state.ajaxLoading = val;
        },
        deleteMission(state, id) {
            console.log(state.cards.findIndex(
                (element) => { return id === element._id; }));
            state.cards.splice(state.cards.findIndex(
                (element) => { return id === element._id; }
            ), 1);
        }
    },
    actions: {
        queryCards(context) {
            context.commit('setLoading', true);
            axios.get(config.apiUrl, {
                    params: context.state.selector
                })
                .then(
                    (res) => {
                        context.state.cards = res.data;
                        context.commit('setLoading', false);
                    })
                .catch(
                    (err) => {
                        context.commit('pushModalMessage', {
                            title: 'Ошибка',
                            msg: err.message
                        });
                        context.commit('setLoading', false);
                    }
                )
        },
        // В params можно передать функцию, которая исполнится при ошибке запроса
        // TODO: подумать, как сделять изящнее
        queryCard(context, params) {
            if (context.state.detail_mission.id === params.id) return;

            context.commit('setLoading', true);
            axios.get(`${config.apiUrl}/${params.id}`)
                .then(
                    (res) => {
                        context.state.detail_mission = res.data.mission;
                        context.commit('setLoading', false);
                    })
                .catch(
                    (err) => {
                        context.state.detail_mission = {};
                        context.commit('pushModalMessage', {
                            title: 'Ошибка',
                            msg: err.message,
                            onOk: params.onErrorOk
                        });
                        context.commit('setLoading', false);
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