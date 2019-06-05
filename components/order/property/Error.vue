<template>
    <div v-if="message" class="alert alert-danger">
        {{message}}
    </div>    
</template>

<script>

import { mapGetters } from 'vuex';
import orderErrors from '~/mixins/order-errors.js'

export default {
    mixins: [orderErrors],
    props: ['id'],
}
</script>

