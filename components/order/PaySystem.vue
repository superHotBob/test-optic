<template>
<div class="pay-system">
    <button class="order__heading" type="button" v-b-toggle.accordion-4 role="tab">4. Оплата</button>
    <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
        <div class="pay-system__wrapper">
            <label class="o-radio o-radio--img" :class="{'active': pay.CHECKED}" v-for="pay in paysystem" :key="pay.ID">
                <input @change="change" name="PAY_SYSTEM_ID" :checked="pay.CHECKED" type="radio" :value="pay.ID"/>
                <img v-if="pay.PSA_LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + pay.PSA_LOGOTIP_SRC" alt="">
                <span>{{pay.NAME}}</span>
            </label>
        </div>
        <div class="order__next">
            <button class="button black" type="button" v-b-toggle.accordion-4.accordion-5>Далее</button>
        </div>
    </b-collapse>
</div>
</template>

<script>

export default {
    props: ['paysystem'],
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    },
}
</script>