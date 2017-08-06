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
        created() {
            // Парсится дата в удобный для вывода формат
            this.date_of_view = moment(this.date_of).format('DD.MM.YYYY');
            switch(this.project) {
                case 'wog': { this.project_view = 'WOG'; break; }
                case 'miniwog': { this.project_view = 'miniWOG'; break; }
            }
            switch(this.game) {
                case 'arma2': { this.game_view = './images/arma2.png'; break; }
                case 'arma3': { this.game_view = './images/arma3.jpg'; break; }
            }
            if (this.mission_description.length > config.cardsDescLength) {
                this.mission_description_view = 
                this.mission_description.slice(0, config.cardsDescLength) + '...';
            } else {
                this.mission_description_view = this.mission_description;
            }
            if (!this.thumbnail) {
                this.thumbnail_view = './images/noimage.png';
            } else {
                this.thumbnail_view = this.thumbnail;
            }
        },
        props: ['game', 'project', 'mission_name', 'thumbnail', 'mission_description', 'date_of'],
        components: {
            'bflike-button': BFButton
        }
    }
</script>

<style lang="sass" src="./mission-card.scss"></style>