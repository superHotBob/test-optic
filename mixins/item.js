export default {
    methods: {
        async addToBasket(url, props=false) {

            var params = false,
                query = '',
                checked = 'N';

            if (props) {

                if (props.elements['order-workshop'].checked)
                    checked = 'Y';

                params = {
                    'left': {
                        'sph':props.elements['left-sph'].value,
                        'cyl':props.elements['left-cyl'].value,
                        'ax':props.elements['left-ax'].value,
                        'add':props.elements['left-add'].value,
                    },
                    'right': {
                        'sph':props.elements['right-sph'].value,
                        'cyl':props.elements['right-cyl'].value,
                        'ax':props.elements['right-ax'].value,
                        'add':props.elements['right-add'].value,
                    },
                    'order_workshop':checked,
                    'workshop_lense':props.elements['workshop-lense'].value
                }

                if (props.elements['center-distance'].checked) {
                    params['center_distance_right'] = props.elements['center-distance-right'].value;
                    params['center_distance_left'] = props.elements['center-distance-left'].value;
                }
            }

            for (let key in params) {
                if (key == 'left' || key == 'right') {
                    for (let name in params[key]) {
                        query += `&${key}[${name}]=${params[key][name]}`;
                    }
                    continue;
                }
                query += `&${key}=${params[key]}`;
            }

            let response = await this.$axios.$get(`${url}&ajax_basket=Y&quantity=${this.itemAmount}${query}`);

            var item = this.item.CURRENT;

            this.$root.$emit('add-item', {item, response})
            this.$bvModal.show('item-added');
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