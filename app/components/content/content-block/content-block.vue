<template>
    <div class="content-block-container">
        <div v-if="title" class="content-block-container__title">
            <h5>{{ title }}</h5>
        </div>
        <div class="content-block-container__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style lang="sass" src="./content-block.scss"></style>