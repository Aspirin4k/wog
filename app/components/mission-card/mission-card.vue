<template>
    <div class="mission-card">
        <div class="mission-card__title-bar">
            <img :src="game_view"></img>
            <h3> {{ mission_name }} </h3>
        </div>
        <p class="mission-card__date-of">
            {{ `от ${date_of_view}` }}
        </p>
        <img class="mission-card__thumbnail" :src="thumbnail_view"></img>
        <p class="mission-card__project">
            Проект: <span> {{ project_view }} </span>
        </p>
        <p class="mission-card__description">{{ mission_description_view }}</p>
        <bflike-button button_text="Подробнее"></bflike-button>
    </div>
</template>

<script>
    import moment from 'moment';
    import config from './../../config.json';
    import BFButton from './../form/bflike-button/bflike-button.vue';

    import arma3 from './images/arma3.jpg';
    import arma2 from './images/arma2.png';
    import noimage from './images/noimage.png';

    export default {
        props: ['game', 'project', 'mission_name', 'thumbnail', 'mission_description', 'date_of'],
        computed: {
            date_of_view: function() {
                return moment(this.date_of).format('DD.MM.YYYY');
            },
            project_view: function() {
                switch (this.project) {
                    case 'wog': return 'WOG';
                    case 'miniwog': return 'miniWOG';
                }
                return null;
            },
            game_view: function() {
                switch (this.game) {
                    case 'arma2': return './images/arma2.png';
                    case 'arma3': return './images/arma3.jpg';
                }
            },
            mission_description_view: function() {
                if (this.mission_description.length > config.cardsDescLength) {
                    return this.mission_description.slice(0, config.cardsDescLength) + '...';
                }
                return this.mission_description;
            },
            thumbnail_view: function() {
                if (!this.thumbnail) {
                    return './images/noimage.png';
                }
                return this.thumbnail;
            }
        },
        components: {
            'bflike-button': BFButton
        }
    }
</script>

<style lang="sass" src="./mission-card.scss"></style>