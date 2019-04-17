<template>
    <div>
        <div v-for="deliver in delivery" :key="deliver.ID">
            <label>
                <input type="radio" v-model="deliveryId" :value="deliver.ID"/>
                <span>{{deliver.NAME}}</span>
            </label>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['delivery'],
    computed: {
        ...mapGetters({
            getCurrent: 'order/getCurrentDelivery',
        }),
        deliveryId: {
            get() {
                return this.getCurrent;
            },
            set(value) {
                this.$parent.$emit('delivery', value)
            }
        } 
    }
}
</script>
