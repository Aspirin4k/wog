<template>
    <div class="content-container">
        <mission-card
            v-for="card in cards"
            :key="card._id"
            :mission_name="card.mission_name"
            :mission_description="card.mission_description"
            :game="card.game"
            :project="card.project"
            :thumbnail="card.thumbnail"
            :date_of="card.date_of"
        ></mission-card>
    </div>
</template>

<script>
    import missionCard from './../mission-card/mission-card.vue';

    // По дефолту пустой массив
    // TODO: выводить сообщение "нет миссий" или что то вроде этого
    let cards = [];
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

<style lang="sass" src="./content.scss"></style>