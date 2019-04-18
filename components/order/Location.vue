<template>
    <div class="form-group">
        <input type="hidden" name="location_type" value="code">
        <div v-for="(value, index) in property.VALUE" :key="index" >
            <input type="hidden" :name="'ORDER_PROP_' + property.ID" :value="value">
            <input 
                @input="locations($event.target.value)" 
                class="form-control" 
                :value="getLocationName({'id':property.ID,'code':value})" 
                placeholder="Выберите местоположение..."/>
        </div>
        <test v-bind:location="locationsList"/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Test from '~/components/order/Test.vue'

export default {
    props: ['property'],
    components: {
        Test
    },
    computed: {
        ...mapGetters({
            getLocationName: 'order/getLocationName' 
        }),
    },
    data() {
        return {
            locationsList:false
        }
    },
    methods: {
        async locations(search) {
            let result = await this.$store.dispatch(
                'order/locations', 
                search
            );
            console.log(result.data.ITEMS)
            this.locationsList = result.data.ITEMS;
            // console.log(this.locationsList)
        },
    },
}
</script>
