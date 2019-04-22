<template>
    <div v-if="getLocationShow">
        <div v-on:click="setLocation(location.CODE)" v-for="location in getLocations" :key="location.CODE">
            <span>{{location.DISPLAY}}</span>
        </div>
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


