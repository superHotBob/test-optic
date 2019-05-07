import qs from 'qs';

export default {

    STATE ({commit, getters}, response) {
        return this.$axios.get(getters.getEndpoint).then((result) => {         
            response.setHeader('Set-Cookie', result.headers['set-cookie']);
            commit('setBasket', result.data.basket);
        })
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