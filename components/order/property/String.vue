<template>
<label class="o-prop textfield">
    <error v-bind:id="property.ID"/>
    <p>{{property.NAME}} *</p>
    <input 
        class="o-prop__input" 
        :name="'ORDER_PROP_' + property.ID"  
        :placeholder="property.NAME"
        v-for="(value, index) in property.VALUE" :key="index" 
        :value="value">
</label>
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
