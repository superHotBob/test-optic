import { mapGetters } from 'vuex';

export default {
    methods: {
        changeOffer(id, code, value) {
            this.$store.dispatch('basket/change',{'id':id, 'code':code, 'value':value,});
        },
        deleteItem(id) {
            this.$store.dispatch('basket/delete',{'id':id});
        },
    },
    computed: {
        ...mapGetters({
            getBasket: 'basket/getBasket'
        }),
    }
}