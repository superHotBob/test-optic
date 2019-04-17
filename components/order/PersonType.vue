<template>
    <div>
        <div v-for="person in personType" :key="person.ID">
            <label>
                <input type="radio" v-model="personTypeId" :value="person.ID"/>
                <span>{{person.NAME}}</span>
            </label>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['personType'],
    computed: {
        ...mapGetters({
            getCurrent: 'order/getCurrentPerson',
        }),
        personTypeId: {
            get() {
                return this.getCurrent;
            },
            set(value) {
                this.$parent.$emit('person', value)
            }
        } 
    }
}
</script>

