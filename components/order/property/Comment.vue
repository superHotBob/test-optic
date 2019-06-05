<template>
<label class="o-prop o-prop--100 textfield">
    <p>Комментарий</p>
    <textarea 
    rows="5" 
    name="ORDER_DESCRIPTION" 
    placeholder="Коментарий"
    v-model="comment"/>
</label>
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
