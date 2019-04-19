<template>
    <div class="form-group">
        <textarea 
        class="form-control" 
        rows="3" 
        name="ORDER_DESCRIPTION" 
        placeholder="Коментарий"
        v-model="comment"/>
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
