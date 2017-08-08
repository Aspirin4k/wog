<template>
    <div class="tag-container">
        <div class="tag-container__title">
            <p>{{ title }}</p>
        </div>
        <div class="tag-container__cross" v-on:click="crossClicked(val)">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['val', 'title'],
        methods: {
            crossClicked(val) {
                this.$emit('crossClicked', val);
            }
        }
    }
</script>

<style lang="sass" src="./bflike-tag.scss"></style>