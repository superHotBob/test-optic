export default {
    methods: {
        async addToBasket(url) {
            let response = await this.$axios.get(`${url}&ajax_basket=Y&quantity=${this.itemAmount}`);
            this.$store.dispatch('basket/STATE');
        },
        async addCompare(url) {

            var response;

            if (this.isCompare(this.item.ID) || this.isCompare(this.item.CURRENT.ID)) {  
                if (this.item.CURRENT)
                    response = await this.$axios.get(this.item.CURRENT.COMPARE_DELETE);
                else 
                    response = await this.$axios.get(this.item.COMPARE_DELETE);
            } else {
                response = await this.$axios.get(url);
            }

            this.$store.dispatch('catalog/GET_COMPARE');
        },
    },
}