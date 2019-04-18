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
                <input 
                    :name="'ORDER_PROP_' + prop.ID"  
                    v-for="(value, index) in prop.VALUE" :key="index" 
                    :value="value">
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
        }),
    },
    data() {
        return {
            props: {},
        }
    },
    methods: {
        // string(value, id) {
        //     console.log(value);
        //     this.props['ORDER_PROP_' + id] = value;
        //     this.event();
        // },
        // location(value, id) {
        //     console.log(value);
        //     this.props['ORDER_PROP_' + id] = value;
        //     this.event();
        // },
        // event() {
        //     this.$parent.$emit('properties', this.props);
        //     console.log(this.props);
        // }
    },
    mounted() {
        var properties = this.getProps;
    }
}
</script>

