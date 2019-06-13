import qs from 'qs';

export default {

    STATE ({commit, getters}) {
        return this.$axios.get(getters.getEndpoint).then((result) => {         
            commit('setBasket', result.data.basket);
        })
    },

    async ADD_COUPON({commit, getters}, coupon)
    {
        var post = {
            'basketAction':'recalculateAjax',
            'via_ajax':'Y',
            'lastAppliedDiscounts': 1,
            'basket[coupon]':coupon,
            'site_id':'s1'
        };

        let response = await this.$axios.post(getters.getEndpoint, qs.stringify(post));
        commit('setBasket', response.data.BASKET_DATA);
    },

    async DELETE_CPUPON({commit, getters}, coupon)
    {   
        var post = {
            'basketAction':'recalculateAjax',
            'via_ajax':'Y',
            'basket[delete_coupon]':coupon
        };

        let response = await this.$axios.post(getters.getEndpoint, qs.stringify(post));
        commit('setBasket', response.data.BASKET_DATA);
    },

    async delete({commit, getters}, payload) {
        var post = {};

        for (let key in getters.getRecalculate) {
            post[key] = getters.getRecalculate[key];
        }

        post['basket[DELETE_' + payload.id + ']'] = 'Y';
        let response = await this.$axios.post(getters.getEndpoint, qs.stringify(post));
        commit('setBasket', response.data.BASKET_DATA);
    },
    async quantity({commit, getters}, payload) {
        var post = {};

        for (let key in getters.getRecalculate) {
            post[key] = getters.getRecalculate[key];
        }

        post['basket[QUANTITY_' + payload.id + ']'] = payload.quantity;
        let response = await this.$axios.post(getters.getEndpoint, qs.stringify(post));
        commit('setBasket', response.data.BASKET_DATA);
    },
    async change({commit, getters}, payload) {
        var post = {};

        for (let key in getters.getRecalculate) {
            post[key] = getters.getRecalculate[key];
        }

        post['basket[OFFER_' + payload.id + '][' + payload.code + ']'] = payload.value;
        let response = await this.$axios.post(getters.getEndpoint, qs.stringify(post));
        commit('setBasket', response.data.BASKET_DATA);

    }
}