<template>
    <div class="app-container">
        <app-header></app-header>
        <app-content>
            <router-view></router-view>
        </app-content>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import axios from 'axios';

    import config from './../config.json';

    import header from './header/header.vue';
    import content from './content/content.vue';
    import footer from './footer/footer.vue';

    export default {
        components: {
            'app-header': header,
            'app-content': content,
            'app-footer': footer
        },
        created() {
            axios.get(config.apiUrl, {
                    params: this.$store.state.selector
                })
                .then(
                        (res) => {
                            this.$store.commit('setCards', res.data)
                        })
        }
  }
</script>

<style lang="sass" src="./reset.scss"></style>
<style lang="sass" src="./base.scss"></style>
<style lang="sass" src="./app.scss"></style>