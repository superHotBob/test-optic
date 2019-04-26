import { mapGetters } from 'vuex';

export default {
    props: [
        'id'
    ],
    data() {
        return {
            timer:null
        }
    },
    methods: {
        quantityUp() {
            var quantity = this.quantity;

            quantity++;
            this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
            this.quantity = quantity;
        },
        quantityDown() {
            var quantity = this.quantity;

            if (quantity > 1) {
                quantity--;
                this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
                this.quantity = quantity;
            }
                
        }
    },
    computed: {
        ...mapGetters({
            getItem: 'basket/getItem',
        }),
        quantity: {
            get () {
                var item = this.getItem(this.id);
                return item.QUANTITY;
            },
            set (quantity) {
                if(!!this.timer)
                {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => { 
                    this.$store.dispatch('basket/quantity', {'id':this.id, 'quantity':quantity});
                }, 500);
            }
        }
    },
}