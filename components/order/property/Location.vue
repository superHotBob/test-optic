<template>
    <div class="form-group">
        <error v-bind:id="property.ID"/>
        <input type="hidden" name="location_type" value="code">
        <div v-for="(value, index) in property.VALUE" :key="index" >
            <input type="hidden" :name="'ORDER_PROP_' + property.ID" :value="value">
            <input 
                @input="locations($event.target.value, property.ID)" 
                class="form-control" 
                :value="getLocationName({'id':property.ID,'code':value})" 
                placeholder="Выберите местоположение..."/>
        </div>
        <search v-bind:id="property.ID"/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import Search from '~/components/order/property/Search.vue'
import Error from '~/components/order/property/Error.vue'

export default {
    props: ['property'],
    components: {
        Search,
        Error
    },
    computed: {
        ...mapGetters({
            getLocationName: 'order/getLocationName' 
        }),
    },
    data() {
        return {
            timer:false
        }
    },
    methods: {
        locations(search, id) {

            if(!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => { 
                
                let input = document.querySelector('input[name="ORDER_PROP_' + id + '"]');
                input.value = '';
                
                this.$store.dispatch(
                    'order/locations', 
                    search
                )
            }, 300);

           
        },
    },
}
</script>
