<template>
    <div class="content-container">
        <mission-card 
            game='aaaa1'
            project=''
            mission_name=''
            thumbnail=''
            mission_description=''
        >
        </mission-card>
    </div>
</template>

<script>
    import missionCard from './../mission-card/mission-card.vue';

    export default {
        components: {
            'mission-card': missionCard
        }
    }
</script>

<style lang="sass" src="./content.scss"></style>