<template>
    <div class="mission-card">
        <div class="mission-card__title-bar">
            <img src={{ game }}></img>
            <img src={{ project }}></img>
            <h3> {{ mission_name }} </h3>
        </div>
        <img src={{ thumbnail }}></img>
        <p>{{ mission_description }}</p>
        <button>Подробнее</button>
    </div>
</template>

<script>
    export default {
        props: ['game', 'project', 'mission_name', 'thumbnail', 'mission_description']
    }
</script>

<style lang="sass" src="./mission-card.scss"></style>