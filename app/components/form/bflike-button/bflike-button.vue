<template>
    <div class="bflike-button-container">
        <a v-on:click="buttonClicked">
            <span class="bflike-button-container__arrow">&#62;</span>
            <span class="bflike-button-container__text">{{ button_text }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        props: ['button_text'],
        methods: {
            buttonClicked() {
                this.$emit('buttonClicked');
            }
        }
    }
</script>

<style lang="sass" src="./bflike-button.scss"></style>