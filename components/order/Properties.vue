<template>
<div>
    <button class="order__heading" type="button" v-b-toggle.accordion-5 role="tab">5. Покупатель</button>
    <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
        <div class="o-prop-wrap">
            <template v-for="prop in getProps">
                <string v-if="prop.TYPE === 'STRING' && prop.CODE != 'index'" v-bind:property="prop" :key="prop.ID" />
            </template>
        </div>
        <comment />
    </b-collapse>            
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import String from '~/components/order/property/String.vue'
import Comment from '~/components/order/property/Comment.vue'


export default {
    components: {
        String,
        Comment,
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
        }),
    },
}
</script>

