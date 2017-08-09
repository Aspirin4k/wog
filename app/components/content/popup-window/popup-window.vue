<template>
    <div class="popup-container">
        <div class="popup-container__window">
            <div class="popup-container__window__header">
                <h6>
                    <slot name="header">
                        Заголовок
                    </slot>
                </h6>
            </div>

            <div class="popup-container__window__body">
                <p>
                    <slot name="body">
                        Тело
                    </slot>
                </p>
            </div>

            <div class="popup-container__window__footer">
                <bflike-button 
                    button_text="ОК"
                    v-on:buttonClicked="okClicked">
                </bflike-button>
            </div>
        </div>
    </div>
</template>

<script>
    import BFLikeButton from './../../form/bflike-button/bflike-button.vue';

    export default {
        props: ['okClicked'],
        components: {
            'bflike-button': BFLikeButton
        }
    }
</script>

<style lang="sass" src="./popup-window.scss"></style>