<template>
    <content-block :title="info.mission_name">
    </content-block>
</template>

<script>
    import contentBlock from './../../content/content-block/content-block.vue';

    export default {
        created() {
            this.$store.dispatch('queryCard', this.$route.params.id);
        },
        computed: {
            info() { return this.$store.state.detail_mission; }
        },
        components: {
            'content-block': contentBlock
        }
    }
</script>