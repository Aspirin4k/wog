<template>
    <div class="header-container">
        <router-link to="/">
            <div class="header-container__img"></div>
        </router-link>
        <div class="header-container__menu">
            <router-link to="/" class="header-container__menu__nav">
                <h2>Главная</h2>
            </router-link>
            <router-link to="/" class="header-container__menu__nav">
                <h2>Статистика</h2>
            </router-link>
            <a v-on:click="authorize" class="header-container__menu__create">
                <h2>Авторизоваться</h2>
            </a>
        </div>
    </div>
</template>

<script>
    import dropdownOnhover from './../form/dropdown-onhover/dropdown-onhover.vue';

    export default {
        components: {
            'dropdown-onhover': dropdownOnhover
        },
        create() {
            this.$emit('');
        },
        methods: {
          authorize() {
            XL.show();
          }
        }
    }
</script>

<style lang="sass" src="./header.scss"></style>