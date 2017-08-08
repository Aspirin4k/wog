<template>
    <ul class="nav">
        <li v-for="option in options" class="nav__option"> 
            <a href="#">
                <h4>{{ $t(option.prop_name) }}</h4>
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </a>
            <ul>
                <li v-for="val in option.vals" v-on:click="queryParamTaken(option.prop_name, val)">
                    <a href="#"><h4>{{ $t(val) }}</h4></a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['options'],
        methods: {
            queryParamTaken: function(opt_title, val) {
                this.$emit('navClicked', opt_title, val);
            }
        }
    }
</script>

<style lang="sass" src="./dropdown-onhover.scss"></style>