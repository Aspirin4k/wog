<template>
    <div class="mission-list-container">
        <content-block title="Фильтры">
            <div>
                <dropdown-onhover
                v-on:navClicked="addQueryParam"
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
                v-for="(filter, index) in filters"
                :key="index"
                :val="filter.prop"
                :title="$t(filter.prop) + ': ' + $t(filter.val)"
                v-on:crossClicked="removeQuery"
                >
            </bflike-tag>
        </div>

        <div class="mission-list-container__missions">
            <p v-if="!cards.length">Упс, ничего не было найдено!</p>
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
        // ажакс делаем единожды при создании компонента
        created() {
            // this.$store.dispatch('queryCards');
        },
        computed: {
            cards() {
                return this.$store.state.cards;
            },
            filters() {
                return this.$store.state.filters;
            }
        },
        methods: {
            // дополнительные запросы при изменении параметров выборки
            // TODO: подумать об оптимизации
            // С другой стороны, если на странице ограниченное количество карт, то
            // имеет смысл делать запрос по N карт при открытии страницы - в результате
            // при изменении фильтров все равно придется подтягивать инфу с апи
            addQueryParam(prop, val) {
                this.$store.commit('addQueryParam', { prop: prop, val: val});
                // this.$store.dispatch('queryCards');
            },
            removeQuery(val) {
                this.$store.commit('removeQueryParam', val);
                // this.$store.dispatch('queryCards');
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