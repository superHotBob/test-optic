<template>
<div class="delivery">
    <button class="order__heading" type="button" v-b-toggle.accordion-3 role="tab">
        <b>3. Доставка</b>
        <span>Изменить</span>
    </button>
    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <div class="delivery__wrapper">
            <div class="delivery__options">
                <label class="o-radio o-radio--img" :class="{'active': deliver.CHECKED}" v-for="deliver in delivery" :key="deliver.ID">
                    <input @change="change" :checked="deliver.CHECKED" name="DELIVERY_ID" type="radio" :value="deliver.ID"/>
                    <img v-if="deliver.LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + deliver.LOGOTIP_SRC" alt="">
                    <span>{{deliver.NAME}}</span>
                </label>
            </div>

            <template v-for="deliver in delivery">
                <div class="delivery__info" v-if="deliver.CHECKED" :key="deliver.ID">
                    <p class="delivery__name">{{deliver.NAME}}</p>
                    <img v-if="deliver.LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + deliver.LOGOTIP_SRC" alt="">
                    <p v-if="deliver.DESCRIPTION">{{deliver.DESCRIPTION}}</p>
                    <p class="delivery__prop">
                        <span>Стоимость:</span>
                        <span>{{deliver.PRICE_FORMATED}}</span>
                    </p>
                    <p class="delivery__prop">
                        <span>Срок доставки:</span>
                        <span></span>
                    </p>
                </div>
            </template>
        </div>
        <div class="order__next">
            <promocode :promocode="promocode" @input="promocode = $event" />
            <button class="button black" type="button" v-b-toggle.accordion-3.accordion-4>Далее</button>
        </div>
    </b-collapse>
    <div class="order__short-info">
        <template v-for="deliver in delivery">
            <p v-if="deliver.CHECKED" :key="deliver.ID">
                <img v-if="deliver.LOGOTIP_SRC" :src="'http://14.esobolev.ru/' + deliver.LOGOTIP_SRC" alt="">
                <b>{{deliver.NAME}}</b>
            </p>
        </template>
    </div>
</div>
</template>

<script>
import Promocode from '~/components/order/property/Promocode.vue'

export default {
    props: ['delivery', 'promocode'],
    components: {
        Promocode,
    },
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    }
}
</script>
