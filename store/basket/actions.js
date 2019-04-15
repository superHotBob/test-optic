import qs from 'qs';

export default {
    async request({commit, getters}) {
        // let auth = await this.$axios.post(`/api/v1/auth/`,qs.stringify({'USER_LOGIN':'admin','USER_PASSWORD':'123456','AUTH_FORM':'Y','TYPE':'AUTH'}));
        let response = await this.$axios.get(getters.getEndpoint);
        commit('setBasket', response.data.basket);
        return response;
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