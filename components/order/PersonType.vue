<template>
<div class="person-type">
    <button class="order__heading mt-0" :class="{'error': hasErrors(3)}" type="button" v-b-toggle.accordion-2 role="tab">
        <b>2. Регион доставки</b>
        <span>Изменить</span>
    </button>
    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" visible>
        <div>
            <span class="person-type__label">Тип плательщика:</span>
            <label class="o-radio" :class="{'active': person.CHECKED}" v-for="person in personType" :key="person.ID">
                <div v-if="person.NAME=='Физическое лицо'">
                <input @change="change" name="PERSON_TYPE" :checked="person.CHECKED" type="radio" :value="person.ID"/>
                <span>{{person.NAME}}</span>
                <input v-if="person.CHECKED" type="hidden" name="PERSON_TYPE_OLD" :value="person.ID">
                </div>
            </label>
        </div>
        <div class="person-type__props o-prop-wrap">
            <template v-for="prop in getProps">
                <string v-if="prop.TYPE === 'STRING' && prop.CODE == 'index'" v-bind:property="prop" :key="prop.ID" />
                <location v-if="prop.TYPE === 'LOCATION'" v-bind:property="prop" :key="prop.ID"/>
            </template>
        </div>
        <div class="order__next mt-3">
            <promocode :promocode="promocode" @input="promocode = $event" />
            <button class="button black" type="button" v-b-toggle.accordion-2.accordion-3>Далее</button>
        </div>
    </b-collapse>
    <div class="order__short-info">
        <template v-for="prop in getProps">
            <p v-if="prop.CODE == 'location'" :key="prop.ID">
                <b>{{prop.NAME}}:</b>
                <span>{{getLocationName({'id':1})}}</span>
            </p>

            <p v-if="prop.CODE == 'index' && prop.VALUE[0]" :key="prop.ID">
                <b>{{prop.NAME}}:</b>
                <span>{{prop.VALUE[0]}}</span>
            </p>
            <div v-if="prop.CODE == 'index' && !prop.VALUE[0]" :key="prop.ID">
                <error :id="prop.ID"/>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import String from '~/components/order/property/String.vue'
import Location from '~/components/order/property/Location.vue'
import Promocode from '~/components/order/property/Promocode.vue'
import Error from '~/components/order/property/Error.vue'


export default {
    props: ['personType', 'promocode'],
    components: {
        String,
        Location,
        Promocode,
        Error,
    },
    methods: {
        change() {
            this.$root.$emit('refresh')
        },
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
            getLocationName: 'order/getLocationName',
            hasErrors: 'order/groupHasErrors',
        }),
    },
}
</script>
