<template>
    <div>
        <div v-if="orderId">
            Заказ №{{orderId}} оформлен
        </div>
        <div v-else>
            <person v-bind:personType="order.PERSON_TYPE"/>
            <delivery v-bind:delivery="order.DELIVERY"/>
            <pay-system v-bind:paysystem="order.PAY_SYSTEM"/>
            <comment/>
            <button class="btn btn-primary" v-on:click="save">to issue</button>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import PaySystem from '~/components/order/PaySystem.vue'
import Delivery from '~/components/order/Delivery.vue'
import Person from '~/components/order/PersonType.vue'
import Comment from '~/components/order/Comment.vue'

export default {
    components: {
        PaySystem,
        Delivery,
        Person,
        Comment
    },
    data() {
        return {
            orderId:false
        }
    },
    methods: {
        async save() {

            var payload, order = {
                'ORDER_DESCRIPTION':'', 
                'soa-action':'saveOrderAjax',
                'sessid':this.getSessid,
            }

            payload = Object.assign(this.request,order);

            let result = await this.$store.dispatch(
                'order/request', 
                payload
            )
            this.$root.$emit('order'); 
            this.orderId = result.order.ID;
        },
        async refresh() {
            this.$store.dispatch(
                'order/request', 
                {
                    'order':this.request,
                    'soa-action':'refreshOrderAjax',
                    'sessid':this.getSessid,
                    'via_ajax':'Y',
                }
            );
        }
    },
    mounted() {
        this.$on('paysystem', value => { 
            this.request.PAY_SYSTEM_ID = value;
            this.refresh();
        })
        this.$on('delivery', value => { 
            this.request.DELIVERY_ID = value;
            this.refresh();
        })
        this.$on('person', value => { 
            this.request.PERSON_TYPE = value;
            this.refresh();
        })
        this.$on('comment', value => { 
            this.request.ORDER_DESCRIPTION = value;
        })
    },
    computed: {
        ...mapGetters({
            getSessid: 'order/getSessid',
            getDelivery: 'order/getCurrentDelivery',
            getPayment: 'order/getCurrentPaySystem',
            getPerson: 'order/getCurrentPerson',
            getDescription: 'order/getDescription'
        }),
        order() {
            return this.$store.getters['order/getOrder'];
        },
        request(){
            return {
                'DELIVERY_ID':this.getDelivery,
                'PAY_SYSTEM_ID':this.getPayment,
                'BUYER_STORE':0,
                'PERSON_TYPE':this.getPerson, 
                'ORDER_DESCRIPTION':this.getDescription
            }      
        }
    },
}
</script>
