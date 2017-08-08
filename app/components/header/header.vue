<template>
    <div class="header-container">
        <router-link to="/">
            <div class="header-container__img"></div>
        </router-link>
        <div class="header-container__menu">
            <router-link to="/">
                <h2 class="header-container__menu__nav">Главная</h2>
            </router-link>
            <router-link to="/">
                <h2 class="header-container__menu__nav">Статистика</h2>
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