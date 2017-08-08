<template>
    <div class="mission-list-container">
        <content-block title="Фильтры">
            <div>
                <dropdown-onhover
                v-on:navClicked="queryCards"
                :options="[
                {
                    prop_name: 'game',
                    vals: [
                        'arma2',
                        'arma3'
                    ]
                },
                {
                    prop_name: 'project',
                    vals: [
                        'wog',
                        'miniwog'
                    ]
                }
                ]"
            ></dropdown-onhover>
            </div>
        </content-block>

        <div class="mission-list-container__tags">
            <bflike-tag 
                v-for="(filter, index) in filters()"
                :key="index"
                :val="filter.prop"
                :title="$t(filter.prop) + ': ' + $t(filter.val)"
                v-on:crossClicked="removeQuery"
                >
            </bflike-tag>
        </div>

        <div class="mission-list-container__missions">
            <mission-card
                    v-for="card in cards"
                    :key="card._id"
                    :mission_info="card"
                ></mission-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import config from './../../../config.json';

    import missionCard from './mission-card/mission-card.vue';
    import contentBlock from './../../content/content-block/content-block.vue';
    import dropdownOnHover from './../../form/dropdown-onhover/dropdown-onhover.vue';
    import BFlikeTag from './../../form/bflike-tag/bflike-tag.vue';

    export default {
        computed: {
            cards() {
                return this.$store.state.cards;
            }
        },
        methods: {
            queryCards(prop, val) {
                this.$store.commit('addQueryParam', { prop: prop, val: val});
                
                axios.get(config.apiUrl, {
                    params: this.$store.state.selector
                })
                .then(
                        (res) => {
                            this.$store.commit('setCards', res.data)
                        })
            },
            removeQuery(val) {
                this.$store.commit('removeQueryParam', val);

                axios.get(config.apiUrl, {
                    params: this.$store.state.selector
                })
                .then(
                        (res) => {
                            this.$store.commit('setCards', res.data)
                        })
            },
            // т.к. этот массив не являтся реактивной зависимостью, он не будет обновляться,
            // как вычисляемое свойство => необходимо реализовать как метод
            filters() {
                let filters = [];
                for (let propName in this.$store.state.selector)
                    filters.push({prop: propName, val: this.$store.state.selector[propName]});

                return filters;
            }
        },
        components: {
            'mission-card': missionCard,
            'content-block': contentBlock,
            'dropdown-onhover': dropdownOnHover,
            'bflike-tag': BFlikeTag
        }
    }
</script>

<style lang="sass" src="./mission-list.scss"></style>