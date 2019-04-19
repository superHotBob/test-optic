<template>
    <div class="form-group">
        <error v-bind:id="property.ID"/>
        <input 
            class="form-control" 
            :name="'ORDER_PROP_' + property.ID"  
            :placeholder="property.NAME"
            v-for="(value, index) in property.VALUE" :key="index" 
            :value="value">
    </div>
</template>

<script>

import Error from '~/components/order/property/Error.vue'

export default {
    components: {
        Error
    },
    props: ['property']
}
</script>
