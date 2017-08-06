<template>
    <ul class="nav">
        <li v-for="option in options" class="nav__option"> 
            <a href="#"><h2>{{ option.opt_title }}</h2></a>
            <ul>
                <li v-for="opt in option.opts" v-on:click="queryParamTaken(option.prop_name, opt.val)">
                    <a href="#"><h4>{{ opt.opt_name }}</h4></a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ['options'],
        methods: {
            queryParamTaken: function(opt_title, opt) {
                let param = {};
                param[opt_title] = opt;
                
                this.$emit('navClicked', param);
            }
        }
    }
</script>

<style lang="sass" src="./dropdown-onhover.scss"></style>