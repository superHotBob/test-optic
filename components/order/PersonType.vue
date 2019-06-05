<template>
<div class="person-type">
    <button class="order__heading" type="button" v-b-toggle.accordion-2 role="tab">2. Регион доставки</button>
    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" visible>
        <div>
            <span class="person-type__label">Тип плательщика:</span>
            <label class="o-radio" :class="{'active': person.CHECKED}" v-for="person in personType" :key="person.ID">
                <input @change="change" name="PERSON_TYPE" :checked="person.CHECKED" type="radio" :value="person.ID"/>
                <span>{{person.NAME}}</span>
                <input v-if="person.CHECKED" type="hidden" name="PERSON_TYPE_OLD" :value="person.ID">
            </label>
        </div>
        <div class="person-type__props o-prop-wrap">
            <template v-for="prop in getProps">
                <string v-if="prop.TYPE === 'STRING' && prop.CODE == 'index'" v-bind:property="prop" :key="prop.ID" />
                <location v-if="prop.TYPE === 'LOCATION'" v-bind:property="prop" :key="prop.ID"/>
            </template>
        </div>
        <div class="order__next">
            <button class="button black" type="button" v-b-toggle.accordion-2.accordion-3>Далее</button>
        </div>
    </b-collapse>
    <div class="order__short-info">
        <template v-for="prop in getProps">
            <p v-if="prop.CODE == 'location'" :key="prop.ID">
                <b>Местоположение:</b>
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
import Error from '~/components/order/property/Error.vue'

export default {
    props: ['personType'],
    components: {
        String,
        Location,
        Error,
    },
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
            getLocationName: 'order/getLocationName',
        }),
    },
    mounted() {
        this.$root.$on('locationChange', function(name) {
            console.log('name = ' + name);
        })
    }

}
</script>
