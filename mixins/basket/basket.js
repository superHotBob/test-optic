import { mapGetters } from 'vuex';

export default {
    methods: {
        changeOffer(id, code, value) {
            this.$store.dispatch('basket/change',{'id':id, 'code':code, 'value':value,});
        },
        deleteItem(id) {
            this.$store.dispatch('basket/delete',{'id':id});
        }
    },
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