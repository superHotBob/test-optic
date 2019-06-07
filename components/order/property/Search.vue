<template>
<div v-if="getLocationShow" class="v-search">
    <span v-on:click="setLocation(location.CODE)" v-for="location in getLocations" :key="location.CODE">{{location.DISPLAY}}</span>
</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['id'],
    methods: {
        setLocation(code) {
            var input = document.querySelector('input[name="ORDER_PROP_' + this.id + '"]');
            input.value = code;
            this.$store.dispatch('order/locationShow', false);
            this.$root.$emit('refresh');
        }
    },
    computed: {
        ...mapGetters({
            getLocations:'order/getLocationList' ,
            getLocationShow:'order/getLocationShow'
        }),
    },
}
</script>

<style lang="scss">
.v-search {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    background-color: #fff;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    z-index: 5;
    span {
        display: block;
        margin-bottom: 0;
        padding: 2px 0;
        padding-right: 16px;
        padding-left: 10px;
        font-size: 14px;
        border-bottom: 1px solid #e6e6e6;
        cursor: pointer;
        &:first-of-type {
            border-top: 1px solid #e6e6e6;
        }
        &:last-of-type {
            margin-bottom: 0;
        }
    }
}
@media (min-width: 769px) {
    .v-search {
        span {
            &:hover,
            &:focus {
                color: #000;
            }
        }
    }
}
</style>
