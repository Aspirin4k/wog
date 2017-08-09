<template>
    <div class="content-container">
        <div class="content-container__loading" v-if="loading">
            <img src='./images/Spinner.svg'></img>
        </div>
        <slot></slot>
    </div>
</template>

<script> 
    export default {
        computed: {
            loading() { return this.$store.state.ajaxLoading }
        }
    }
</script>

<style lang="sass" src="./content.scss"></style>