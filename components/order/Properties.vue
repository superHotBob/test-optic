<template>
<div>
    <button class="order__heading" :class="{'error': hasErrors(4)}" type="button" v-b-toggle.accordion-5 role="tab">
        <b>5. Покупатель</b>
        <span>Изменить</span>
    </button>
    <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
        <div class="o-prop-wrap">
            <template v-for="prop in getProps">
                <string v-if="prop.TYPE === 'STRING' && prop.CODE != 'index'" v-bind:property="prop" :key="prop.ID" />
            </template>
        </div>
        <comment />
    </b-collapse>  
    <div class="order__short-info">
        <template v-for="prop in getProps">
            <p v-if="prop.TYPE === 'STRING' && prop.CODE != 'index' && prop.VALUE[0]" :key="prop.ID">
                <b>{{prop.NAME}}:</b>
                <span>{{prop.VALUE[0]}}</span>
            </p>
            <div v-if="prop.TYPE === 'STRING' && prop.CODE != 'index' && !prop.VALUE[0]" :key="prop.ID">
                <error :id="prop.ID"/>
            </div>
        </template>
    </div>          
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import String from '~/components/order/property/String.vue'
import Comment from '~/components/order/property/Comment.vue'
import Error from '~/components/order/property/Error.vue'

export default {
    components: {
        String,
        Comment,
        Error,
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
            hasErrors: 'order/groupHasErrors',
        }),
    },
}
</script>
