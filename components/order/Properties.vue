<template>
    <div>
        <div v-for="prop in getProps" :key="prop.ID">

            <string v-if="prop.TYPE === 'STRING'" v-bind:property="prop"/>
            <location v-if="prop.TYPE === 'LOCATION'" v-bind:property="prop"/>

            
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import String from '~/components/order/String.vue'
import Location from '~/components/order/Location.vue'

export default {
    components: {
        String,
        Location
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
        }),
    },
}
</script>

