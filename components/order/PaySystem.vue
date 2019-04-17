<template>
    <div>
        <div v-for="pay in paysystem" :key="pay.ID">
            <label>
                <input type="radio" v-model="paySystemId" :value="pay.ID"/>
                <span>{{pay.NAME}}</span>
            </label>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['paysystem'],
    computed: {
        ...mapGetters({
            getCurrent: 'order/getCurrentPaySystem',
        }),
        paySystemId: {
            get() {
                return this.getCurrent;
            },
            set(value) {
                console.log(value)
            }
        } 
    }
}
</script>
