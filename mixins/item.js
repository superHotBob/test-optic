export default {
    methods: {
        async addToBasket(url, props=false) {

            var params = false,
                query = '';

            if (props) {
                params = {
                    'left': {
                        'sph':props.elements['left-sph'].value,
                        'cyl':props.elements['left-cyl'].value,
                        'ax':props.elements['left-ax'].value,
                        'add':props.elements['left-add'].value
                    },
                    'right': {
                        'sph':props.elements['right-sph'].value,
                        'cyl':props.elements['right-cyl'].value,
                        'ax':props.elements['right-ax'].value,
                        'add':props.elements['right-add'].value
                    }
                }
            }
            
            for (let key in params) {
                for (let name in params[key]) {
                    query += `&${key}[${name}]=${params[key][name]}`;
                }
            }

            console.log(query);

            let response = await this.$axios.get(`${url}&ajax_basket=Y&quantity=${this.itemAmount}${query}`);
            // this.$store.dispatch('basket/STATE');
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