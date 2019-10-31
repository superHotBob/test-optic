import { mapGetters } from 'vuex';

export default {
    props: [
        'id',
        'itemname'
    ],
    data() {
        return {
            timer:null
        }
    },
    methods: {
        quantityUp() {
            var itemname=this.itemname.split(" ")[0];
            var quantity = this.quantity;
            if(itemname!='Линза')
                {
                    quantity++;
                    this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
                    this.quantity = quantity;
                }
            else
                {
                    quantity=quantity+2;
                    this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
                    this.quantity = quantity;
                }

        },
        quantityDown() {
            var itemname=this.itemname.split(" ")[0];
            var quantity = this.quantity;
            if (quantity > 1) {
                if(itemname!='Линза')
                {
                    quantity--;
                    this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
                    this.quantity = quantity;
                }
                else
                {
                    quantity=quantity-2;
                    this.$store.commit('basket/setQuantity', {'id':this.id,'quantity':quantity});
                    this.quantity = quantity;
                }
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