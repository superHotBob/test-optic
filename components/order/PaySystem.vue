<template>
<div class="pay-system">
    <button class="order__heading" type="button" v-b-toggle.accordion-4 role="tab">
        <b>4. Оплата</b>
        <span>Изменить</span>
    </button>
    <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <div class="pay-system__wrapper">
            <label class="o-radio o-radio--img" :class="{'active': pay.CHECKED}" v-for="pay in paysystem" :key="pay.ID">
                <input @change="change" name="PAY_SYSTEM_ID" :checked="pay.CHECKED" type="radio" :value="pay.ID"/>
                <img v-if="pay.PSA_LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + pay.PSA_LOGOTIP_SRC" alt="">
                <span>{{pay.NAME}}</span>
            </label>
        </div>
    </b-collapse>
    <div class="order__short-info">
        <template v-for="pay in paysystem">
            <p v-if="pay.CHECKED" :key="pay.ID">
                <img v-if="pay.PSA_LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + pay.PSA_LOGOTIP_SRC" alt="">
                <b>{{pay.NAME}}</b>
            </p>
        </template>
    </div>
</div>
</template>

<script>
import Promocode from '~/components/order/property/Promocode.vue'

export default {
    props: ['paysystem', 'promocode'],
    components: {
        Promocode,
    },
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    },
}
</script>