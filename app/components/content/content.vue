<template>
    <div class="content-container">
        <div class="content-container__loading" v-if="loading">
            <img src='./images/Spinner.svg'></img>
        </div>
        <popup-window v-if="error" :okClicked="closeErrorModal">
            <span slot="header">Ошибка</span>
            <span slot="body">{{ error.msg }}</span>
        </popup-window>
        <slot></slot>
    </div>
</template>

<script> 
    import popupWindow from './popup-window/popup-window.vue';

     export default {
        components: {
            'popup-window': popupWindow
        },
        computed: {
            loading() {
                return this.$store.state.ajaxLoading 
            },
            error() {
                return this.$store.state.exceptions[0];
            }
        },
        methods: {
            closeErrorModal() {
                this.$store.commit('removeFirstException');
            }
        }
    }
</script>

<style lang="sass" src="./content.scss"></style>