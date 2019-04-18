<template>
    <div>
        <div v-for="prop in getProps" :key="prop.ID">
            <div v-if="prop.TYPE === 'STRING'">
                
                <input 
                    :name="'ORDER_PROP_' + prop.ID"  
                    v-for="(value, index) in prop.VALUE" :key="index" 
                    :value="value">
            </div>
            <div v-if="prop.TYPE === 'LOCATION'">
                <input type="hidden" name="location_type" value="code">
                <div v-for="(value, index) in prop.VALUE" :key="index" >
                    <input type="hidden" :name="'ORDER_PROP_' + prop.ID" :value="value">
                    <input @input="locations($event.target.value)" :value="getLocationName({'id':prop.ID,'code':value})"/>
                </div>
                <div>
                    <div v-for="location in locationsList" :key="location.CODE">
                        <span>{{location.DISPLAY}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import qs from 'qs';

export default {
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
            getLocationName: 'order/getLocationName' 
        }),
    },
    data() {
        return {
            locationsList: false
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

