<template>
    <div class="mission-create-container">
        <div class="mission-create-container__header">
            <bflike-button 
                button_text="Сохранить изменения" 
                v-on:buttonClicked="postData"
            ></bflike-button>
        </div>

        <content-block title="Основная информация">
            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Название миссии:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <input 
                        v-model="mission.mission_name" 
                        v-validate.initial="'required'" 
                        name="mission_name" 
                        type="text">
                    <div v-if="errors.first('mission_name')" class="error-msg">
                        <p>{{ errors.first('mission_name') }}</p>
                    </div>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Игра:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <div class="styled-select">
                        <select v-model="mission.game">
                            <option value="arma3">ArmA 3</option>
                            <option value="arma2">ArmA 2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Проект:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <div class="styled-select">
                        <select v-model="mission.project">
                            <option value="wog">WOG</option>
                            <option value="miniwog">miniWOG</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Изображение для предпросмотра:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <image-uploader
                        v-on:uploading="$store.commit('setLoading',true)"
                        v-on:uploaded="uploaded"
                    >
                    </image-uploader>
                    <p class="small-text">
                        Это изображение будет отрисовано на карточке миссии на главной странице.
                    </p>
                    <div>
                        <img v-if="mission.thumbnail" :src="mission.thumbnail"></img>
                    </div>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Вводная миссии:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <textarea v-model="mission.mission_description"></textarea>
                    <p class="small-text">
                        Описание миссии, которое будет отображено на карточке миссии. Может быть важно для отыгрыша ролей сторонами.
                    </p>
                </div>
            </div>

        </content-block>

        <content-block title="Дополнительная информация">
            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Задача стороны синих:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <textarea
                        v-model="mission.task_blue"></textarea>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Задача стороны красных:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <textarea v-model="mission.task_red"></textarea>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Задача стороны зеленых:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <textarea v-model="mission.task_green"></textarea>
                </div>
            </div>

            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Условности:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <textarea v-model="mission.conventions"></textarea>
                    <p class="small-text">
                        Условности - договоренности, которые должны соблюдать стороны в течении миссии.
                        Условности могут быть неограничены игровой механикой.
                    </p>
                </div>
            </div>
        </content-block>

        <content-block title="Галерея скриншотов">
            <div class="mission-create-container__row">
                <div class="mission-create-container__row__title">
                    <h4>Скриншоты миссии:</h4>
                </div>
                <div class="mission-create-container__row__input">
                    <image-uploader
                        v-on:uploading="$store.commit('setLoading',true)"
                        v-on:uploaded="uploadedScreenshots"
                        :multiple="true"
                    >
                    </image-uploader>
                </div>
            </div>
            <div class="mission-create-container__img-bar">
                <img
                    v-for="screenshot in mission.screenshots"
                    :src="screenshot"
                >
                </img>
            </div>
        </content-block>

        <div class="mission-create-container__header">
            <bflike-button 
                button_text="Сохранить изменения" 
                v-on:buttonClicked="postData"
            ></bflike-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import contentBlock from './../../content/content-block/content-block.vue';
    import imageUploader from './../../content/image-uploader/image-uploader.vue';
    import BFLikeButton from './../../form/bflike-button/bflike-button.vue';

    import config from './../../../config.json';

    export default {
        data() {
            return {
                mission: {
                    mission_name: "",
                    mission_description: "",
                    game: "arma3",
                    project: "wog",
                    thumbnail: "",
                    task_blue: "",
                    task_red: "",
                    task_green: "",
                    conventions: "",
                    screenshots: []
                }
            }
        },
        components: {
            'content-block': contentBlock,
            'image-uploader': imageUploader,
            'bflike-button': BFLikeButton
        },
        computed: {
            tasks() {

            }
        },
        methods: {
            uploaded(event) {
                this.$store.commit('setLoading', false);
                if (!event.response && !event[0] || event.response && event.response.status != 200)
                {
                    this.$store.commit('throwException', 
                        event.response ? event.response.statusText : event.message);
                }
                else
                {
                    this.mission.thumbnail = event[0].data.url;
                }
            },
            uploadedScreenshots(event) {
                this.$store.commit('setLoading', false);
                if (!event.response && !event[0] || event.response && event.response.status != 200)
                {
                    this.$store.commit('throwException', 
                        event.response ? event.response.statusText : event.message);
                }
                else
                {
                    event.forEach((screenshot) => { this.mission.screenshots.push(screenshot.data.url)});
                }
            },
            postData() {
                if (this.mission.mission_name) {
                    this.$store.commit('setLoading', true);

                    axios.post(
                        config.apiUrl,
                        {
                            mission_name: this.mission.mission_name,
                            mission_description: this.mission.mission_description,
                            thumbnail: this.mission.thumbnail,
                            game: this.mission.game,
                            project: this.mission.project,
                            task_blue: this.mission.task_blue,
                            task_green: this.mission.task_green,
                            task_red: this.mission.task_red,
                            screenshots: this.mission.screenshots
                        }
                    ).then((res) => { 
                        this.$store.commit('setLoading', false);
                        this.$router.push('/');
                    })
                    .catch((err) => { 
                        this.$store.commit('setLoading', false);
                        this.$store.commit('throwException', err.response.statusText);
                    });
                }
            }
        }
    }
</script>

<style lang="sass" src="./mission-create.scss"></style>