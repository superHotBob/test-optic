import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            getError: 'order/getErrorProperty' 
        }),
        message() {
            let new_message, message = false;
            
            if (new_message = this.getError(this.id)) 
                message = new_message;
            
            return message;
        }
    },
}