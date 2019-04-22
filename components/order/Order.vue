<template>
    <form ref="form">
        <input type="hidden" name="sessid" :value="getSessid">
        <input type="hidden" name="BUYER_STORE" value="0">
        <div v-if="orderId">
            Заказ №{{orderId}} оформлен
        </div>
        <div v-else>
            <person v-bind:personType="order.PERSON_TYPE"/>
            <delivery v-bind:delivery="order.DELIVERY"/>
            <pay-system v-bind:paysystem="order.PAY_SYSTEM"/>
            <properties/>
            <comment/>
            <button type="button" class="btn btn-primary" v-on:click="save">to issue</button>
            <p>Итого: {{getPrice}}</p>
        </div>
    </form>
</template>

<script>

import { mapGetters } from 'vuex';
import PaySystem from '~/components/order/PaySystem.vue'
import Delivery from '~/components/order/Delivery.vue'
import Person from '~/components/order/PersonType.vue'
import Properties from '~/components/order/Properties.vue'
import Comment from '~/components/order/property/Comment.vue'

export default {
    components: {
        PaySystem,
        Delivery,
        Person,
        Properties,
        Comment
    },
    data() {
        return {
            orderId:false,
        }
    },
    methods: {
        getFormData() {
            let form = new FormData(this.$refs.form), 
                formData = {};

            for (let [key, value] of form.entries()) { 
                formData[key] = value;
            }

            return formData;
        },
        async save() {
            if (!this.isEmptyBasket) {
                var payload, order = {
                    'soa-action':'saveOrderAjax',
                }

                payload = Object.assign(this.getFormData(),order);

                let result = await this.$store.dispatch(
                    'order/request', 
                    payload
                );
                
                if (result.hasOwnProperty('ERROR'))
                    return;
                
                if (!this.isLogged)
                    this.$store.dispatch('user/state');

                this.orderId = result.order.ID;

                if (this.orderId) 
                    this.$root.$emit('order'); 
            } 
        },
        async refresh() {
            this.$store.dispatch(
                'order/request', 
                {
                    'order':this.getFormData(),
                    'soa-action':'refreshOrderAjax',
                    'sessid':this.getSessid,
                    'via_ajax':'Y',
                }
            );
        }
    },
    mounted() {
        this.$root.$on('refresh', value => { 
            this.refresh();
        })
    },
    computed: {
        ...mapGetters({
            getSessid: 'order/getSessid',
            getOrder: 'order/getOrder',
            getPrice: 'order/getTotalPrice',
            isEmptyBasket: 'order/isEmptyBasket',
            isLogged: 'user/isLogged'
        }),
        order() {
            return this.getOrder;
        },
    },
}
</script>
