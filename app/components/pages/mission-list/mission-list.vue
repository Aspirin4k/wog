<template>
    <div class="mission-list-container">
        <mission-card
                v-for="card in cards"
                :key="card._id"
                :mission_info="card"
            ></mission-card>
    </div>
</template>

<script>
    import missionCard from './mission-card/mission-card.vue';

    export default {
        computed: {
            cards() {
                return this.$store.state.cards;
            }
        },
        components: {
            'mission-card': missionCard
        }
    }
</script>

<style lang="sass" src="./mission-list.scss"></style>