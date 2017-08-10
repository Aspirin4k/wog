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
            <router-link to="/create" class="header-container__menu__create">
                <h2>Создать миссию</h2>
            </router-link>
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
        }
    }
</script>

<style lang="sass" src="./header.scss"></style>