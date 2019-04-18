<template>
    <div>
        <textarea name="ORDER_DESCRIPTION" v-model="comment"></textarea>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            message: 'order/getComment',
        }),
        comment: {
            get() {
                return this.message;
            },
            set(value) {
                this.$parent.$emit('comment', value)
            }
        } 
    }
}
</script>
