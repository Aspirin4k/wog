<template>
    <div class="header-container">
        <a href="/">
            <div class="header-container__img"></div>
        </a>
        <div class="header-container__menu">
            <dropdown-onhover
            v-on:navClicked="queryCards"
            :options="[
            {
                opt_title: 'Игра',
                prop_name: 'game',
                opts: [
                    { opt_name: 'ArmA 2', val: 'arma2' },
                    { opt_name: 'ArmA 3', val: 'arma3' }
                ]
            },
            {
                opt_title: 'Проект',
                prop_name: 'project',
                opts: [
                    { opt_name: 'WOG', val: 'wog' },
                    { opt_name: 'miniWOG', val: 'miniwog' }
                ]
            }
            ]"
        ></dropdown-onhover>
        </div>
    </div>
</template>

<script>
    import dropdownOnhover from './../form/dropdown-onhover/dropdown-onhover.vue';

    export default {
        components: {
            'dropdown-onhover': dropdownOnhover
        },
        methods: {
            queryCards(event) {
                this.$store.commit('queryCards', event);
            }
        },
        create() {
            this.$emit('');
        }
    }
</script>

<style lang="sass" src="./header.scss"></style>