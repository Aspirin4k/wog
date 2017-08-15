<template>
    <div class="image-uploader-container">
        <div class="image-uploader-container__choose">
            <bflike-button
                button_text="Выбрать локальный файл"
                v-on:buttonClicked="chooseFile"
            >
            </bflike-button>
        </div>
        <input 
            type="file" 
            @change="proccessFile($event)"
            ref="uploadButton"
            accept=".jpg, .jpeg, .png"
        >
        <div class="image-uploader-container__tags">
            <bflike-tag
                v-for="file in files"
                :key="file.name"
                :title="file.name"
                :val="file.name"
                v-on:crossClicked="removeImage(file)"
            >
            </bflike-tag>
        </div>
        <div class="image-uploader-container__upload">
            <bflike-button
                v-if="files.length"
                button_text="Загрузить выбранное"
                v-on:buttonClicked="createImages"
            >
            </bflike-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import sha1 from 'js-sha1';
    import PromiseFileReader from 'promise-file-reader';

    import BFLikeTag from './../../form/bflike-tag/bflike-tag.vue';
    import BFLikeButton from './../../form/bflike-button/bflike-button.vue';

    import config from './../../../config.json';

    export default {
        data() {
            return {
                files: []
            }
        },
        components: {
            'bflike-tag': BFLikeTag,
            'bflike-button': BFLikeButton
        },
        props: ['multiple'],
        methods: {
            chooseFile() {
                this.$refs.uploadButton.click();
            },
            proccessFile(event) {
                // При флаге загрузки нескольких файлов
                if (this.multiple) {
                     if (!this.files.find((element) => {
                            return element.name === event.target.files[0].name;
                        }))
                        this.files.push(event.target.files[0]);

                } else {
                    this.files = [ event.target.files[0] ];
                }
                event.value = "";
            },
            removeImage(image) {
                this.files.splice(this.files.indexOf(image),1);
            },
            createImages() {
                var fPromises = [];
                var aPromises = [];

                this.$emit('uploading');

                // Создается обещание для каждого выбранного файла
                this.files.forEach(
                    (file) => {
                        var fPromise = PromiseFileReader.readAsDataURL(file);
                        fPromises.push(fPromise);
                    }
                );

                // И после загрузки всех файлов создается обещание запроса
                Promise.all(fPromises).then((results) => {
                    results.forEach(
                        (result) => {
                            var hash = sha1.create();
                            var timestamp = new Date().getTime();
                            var query = `timestamp=${timestamp}${config.apiImageSecret}`;
                            hash.update(query);

                            var aPromise = axios.post(
                                config.apiImageUrl,
                                {
                                    file: result,
                                    api_key: config.apiImageKey,
                                    timestamp: timestamp,
                                    signature: hash.hex()
                                }
                            )

                            aPromises.push(aPromise);
                        }
                    )

                    // И после выполнения каждого запроса
                    axios.all(aPromises).then((results) => {
                        this.$emit('uploaded',results);
                        this.files = [];
                    })
                    .catch((error) => {
                        this.$emit('uploaded',error);
                    });
                });
            }
        }
    }
</script>

<style lang="sass" src="./image-uploader.scss"></style>