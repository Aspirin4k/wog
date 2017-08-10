<template>
    <content-block title="Создание миссии">
        <div class="mission-create-row">
            <div class="mission-create-row__title">
                <h4>Название миссии:</h4>
            </div>
            <div class="mission-create-row__input">
                <input type="text">
            </div>
        </div>

        <div class="mission-create-row">
            <div class="mission-create-row__title">
                <h4>Игра:</h4>
            </div>
            <div class="mission-create-row__input">
                <div class="styled-select">
                    <select>
                        <option value="arma3">ArmA 3</option>
                        <option value="arma2">ArmA 2</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mission-create-row">
            <div class="mission-create-row__title">
                <h4>Проект:</h4>
            </div>
            <div class="mission-create-row__input">
                <div class="styled-select">
                    <select>
                        <option value="wog">WOG</option>
                        <option value="miniwog">miniWOG</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mission-create-row">
            <div class="mission-create-row__title">
                <h4>Изображение для предпросмотра:</h4>
            </div>
            <div class="mission-create-row__input">
                <image-uploader
                    v-on:uploading="$store.commit('setLoading',true)"
                    v-on:uploaded="uploaded"
                >
               </image-uploader>
               <img v-if="thumnail" :src="thumnail" height=192></img>
            </div>
        </div>
    </content-block>
</template>

<script>
    import contentBlock from './../../content/content-block/content-block.vue';
    import imageUploader from './../../content/image-uploader/image-uploader.vue';

    import config from './../../../config.json';

    export default {
        data() {
            return {
                thumnail: ""
            }
        },
        components: {
            'content-block': contentBlock,
            'image-uploader': imageUploader
        },
        methods: {
            uploaded(event) {
                this.$store.commit('setLoading', false);
                if (event.response && event.response.status != 200)
                {
                    this.$store.commit('throwException', event.response.statusText);
                }
                else
                {
                    this.thumnail = event[0].data.url;
                }
            }
        }
    }
</script>

<style lang="sass" src="./mission-create.scss"></style>