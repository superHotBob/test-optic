<template>
    <div class="form-group">
        <input 
            class="form-control" 
            :name="'ORDER_PROP_' + property.ID"  
            :placeholder="property.NAME"
            v-for="(value, index) in property.VALUE" :key="index" 
            :value="value">
    </div>
</template>

<script>
export default {
    props: ['property']
}
</script>
