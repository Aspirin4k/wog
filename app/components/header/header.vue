<template>
    <div class="header-container">
        <router-link to="/">
            <div class="header-container__img"></div>
        </router-link>
        <div class="header-container__menu">
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