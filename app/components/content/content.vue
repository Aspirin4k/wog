<template>
    <div class="content-container">
        <div class="content-container__loading" v-if="loading">
            <img src='./images/Spinner.svg'></img>
        </div>
        <popup-window v-if="error" 
            :okClicked="error.onOk"
            :cancelClicked="error.onCancel"
        >
            <span slot="header">{{ error.title }}</span>
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
                return this.$store.state.modal_messages[0];
            }
        },
        watch: {
            '$route' (to, from) {
                this.$store.commit('clearModalMessages');
            }
        }
    }
</script>

<style lang="sass" src="./content.scss"></style>