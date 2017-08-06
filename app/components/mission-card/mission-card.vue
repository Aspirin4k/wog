<template>
    <div class="mission-card">
        <div class="mission-card__title-bar">
            <img :src="'./images/' + game + '.jpg'"></img>
            <h3> {{ mission_name }} </h3>
        </div>
        
        <p>{{ mission_description }}</p>
        <button>Подробнее</button>
    </div>
</template>

<script>
    import arma3 from './images/arma3.jpg';

    export default {
        props: ['game', 'project', 'mission_name', 'thumbnail', 'mission_description']
    }
</script>

<style lang="sass" src="./mission-card.scss"></style>