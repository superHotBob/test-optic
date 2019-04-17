<template>
    <div>
        <textarea v-model="comment"></textarea>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            message: 'order/getDescription',
        }),
        comment: {
            get() {
                var message;
                
                if (this.message)
                    message = this.message;
                else 
                    message = '';
                return message;
            },
            set(value) {
                this.$parent.$emit('comment', value)
            }
        } 
    }
}
</script>
