<template>
    <div class="bflike-button-container">
        <a>
            <span class="bflike-button-container__arrow">&#62;</span>
            <span class="bflike-button-container__text">{{ button_text }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        props: ['button_text']
    }
</script>

<style lang="sass" src="./bflike-button.scss"></style>