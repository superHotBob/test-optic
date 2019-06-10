export default {
    methods: {
        async addToBasket(url) {
            let response = await this.$axios.get(`${url}&ajax_basket=Y&quantity=${this.itemAmount}`);
            this.$store.dispatch('basket/STATE');
        },
        async addCompare(url) {
            let response = await this.$axios.get(url);
            this.$store.dispatch('catalog/GET_COMPARE');
        },
    },
}