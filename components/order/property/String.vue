<template>
<label class="o-prop textfield" :class="{'error': message}">
    <p>{{property.NAME}} *</p>
    <input
        class="o-prop__input"
        :name="'ORDER_PROP_' + property.ID"  
        v-for="(value, index) in property.VALUE" :key="index" 
        :value="value">
</label>
</template>

<script>

import { mapGetters } from 'vuex';
import Error from '~/components/order/property/Error.vue'

export default {
   
    props: ['property'],
    components: {
        Error
    },
    computed: {
        ...mapGetters({
            getError: 'order/getErrorProperty' 
        }),
        message() {
            let new_message, message = false;
            
            if (new_message = this.getError(this.property.ID)) 
                message = new_message;
            
            return message;
        }
    },
}
</script>
