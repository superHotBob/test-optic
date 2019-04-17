<template>
    <div>
        <pay-system v-bind:paysystem="order.PAY_SYSTEM"/>
        <button v-on:click="refresh">Refresh</button>
    </div>
</template>

<script>

import PaySystem from '~/components/order/PaySystem.vue'

export default {
    components: {
        PaySystem
    },
    methods: {
        async refresh() {
            var order = {
                'PAY_SYSTEM_ID':3,
                'PERSON_TYPE':1,
                'BUYER_STORE':0,
                'ORDER_DESCRIPTION':'',
                'location_type':'code',
                'sessid':'3d32ed5e3d828412c53b2ae352598e4d',
                'soa-action':'refreshOrderAjax'
            }
            console.log(order);
            this.$store.dispatch('order/refresh', {'order':order,'SITE_ID':'s1','soa-action':'refreshOrderAjax','sessid':'3d32ed5e3d828412c53b2ae352598e4d'});
        }
    },
    computed: {
        order() {
            return this.$store.getters['order/getOrder'];
        },
    },
}
</script>
