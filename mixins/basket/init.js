import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$root.$on('login/logout', result => { 
            this.$store.dispatch('basket/STATE');
        })
        this.$root.$on('order', result => { 
            this.$store.dispatch('basket/STATE');
        })
    },
    watch: {
        'getBasket': function() {
            this.$store.dispatch('order/STATE'); 
        }
    },
    computed: {
        ...mapGetters({
            getBasket: 'basket/getBasket'
        }),
    }
}