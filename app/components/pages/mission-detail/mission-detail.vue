<template>
    <div class="mission-detail-container">
        <div class="mission-detail-container__header">
            <div class="mission-detail-container__header__button">
                <bflike-button 
                    button_text="Изменить" 
                    v-on:buttonClicked="editMission"
                ></bflike-button>
            </div>
            <div class="mission-detail-container__header__button">
                <bflike-button 
                    button_text="Удалить" 
                    v-on:buttonClicked="deleteMission"
                ></bflike-button>
            </div>
        </div>

        <content-block :title="info.mission_name">
            <div class="mission-detail-container__content">
                <img
                    v-if="info.thumbnail"
                    class="mission-detail-container__content__thumbnail"
                    :src="info.thumbnail"
                ></img>
                <p class="wall-of-text"><span class="bold-text">Игра:</span> {{ $t(info.game) }}</p>
                <p class="wall-of-text"><span class="bold-text">Проект:</span> {{ $t(info.project) }}</p>
                <p class="wall-of-text">
                    <span class="bold-text">Вводная:</span> 
                    <pre>{{ info.mission_description ? info.mission_description : "Нет данных" }}</pre>
                </p>
                <p class="wall-of-text">
                    <span class="bold-text">Задача синих:</span> 
                    <pre>{{ info.task_blue ? info.task_blue : "Нет данных" }}</pre>
                </p>
                <p class="wall-of-text">
                    <span class="bold-text">Задача красных:</span> 
                    <pre>{{ info.task_red ? info.task_red : "Нет данных" }}</pre>
                </p>
                <p class="wall-of-text">
                    <span class="bold-text">Задача зеленых:</span> 
                    <pre>{{ info.task_green ? info.task_green : "Нет данных" }}</pre>
                </p>
                <p class="wall-of-text">
                    <span class="bold-text">Условности:</span> 
                    <pre>{{ info.conventions ? info.conventions : "Нет данных" }}</pre>
                </p>
            </div>
        </content-block>

        <div class="mission-detail-container__header">
            <div class="mission-detail-container__header__button">
                <bflike-button 
                    button_text="Изменить" 
                    v-on:buttonClicked="editMission"
                ></bflike-button>
            </div>
            <div class="mission-detail-container__header__button">
                <bflike-button 
                    button_text="Удалить" 
                    v-on:buttonClicked="deleteMission"
                ></bflike-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import contentBlock from './../../content/content-block/content-block.vue';
    import BFLikeButton from './../../form/bflike-button/bflike-button.vue';

    import config from './../../../config.json';

    export default {
        created() {
            this.loadMission();
        },
        computed: {
            info() { return this.$store.state.detail_mission; }
        },
        components: {
            'content-block': contentBlock,
            'bflike-button': BFLikeButton
        },
        methods: {
            loadMission() {
                this.$store.dispatch('queryCard', 
                    {
                        id: this.$route.params.id,
                        onErrorOk: () => {
                            this.$router.push('/'); 
                        }
                    });
            },
            deleteMission() {
                this.$store.commit('pushModalMessage', {
                    id: 'deleteStarted',
                    title: 'Подтвердите действие',
                    msg: 'Удаление безвозвратно. Продолжить?',
                    onOk: () => {
                        this.$store.commit('setLoading', true);
                        var id = this.$route.params.id;
                        axios.delete(`${config.apiUrl}/${id}`)
                            .then((res) => {
                                this.$store.commit('setLoading', false);
                                this.$store.commit('deleteMission', id);
                                this.$router.push('/');
                            })
                            .catch((err) => {
                                let error = 
                                    err.response ?
                                    err.response.data.error ? err.response.data.error : err.response.statusText :
                                    err.message;
                                this.$store.commit('setLoading', false);
                                this.$store.commit('pushModalMessage', {
                                    title: "Ошибка",
                                    msg: error,
                                    onOk: () => {
                                        this.$router.push('/');
                                    }
                                });
                            });
                    },
                    onCancel: () => {

                    }
                });
            },
            editMission() {
                this.$router.push(`/edit/${this.$route.params.id}`);
            }
        },
        watch: {
            '$route' (to, from) {
                switch(to.name) {
                    case 'detail':
                        this.loadMission();
                        break;
                }
            }
        }
    }
</script>

<style lang="sass" src="./mission-detail.scss"></style>