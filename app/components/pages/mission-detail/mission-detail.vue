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
                    class="mission-detail-container__content__thumbnail"
                    :src="info.thumbnail"
                ></img>
                <p>Игра: </p>
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
                this.$store.commit('setLoading', true);
                var id = this.$route.params.id;
                axios.delete(`${config.apiUrl}/${id}`)
                    .then((res) => {
                        this.$store.commit('setLoading', false);
                        this.$store.commit('deleteMission', id);
                    })
                    .catch((err) => { 
                        this.$store.commit('setLoading', false);
                        console.log(err);
                        this.$store.commit('pushModalMessage', err.response.statusText);
                    });
                this.$router.push('/');
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