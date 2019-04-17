import qs from 'qs';

export default {
    async state({commit, getters}) {
        let order = await this.$axios.$get(getters.getEndpoint);
        commit('setOrder', order);
    },
    async refresh({commit, getters}, payload) {
        let order = await this.$axios.$post(getters.getEndpoint, qs.stringify(payload));
        console.log(order);
        // commit('setOrder', order);
    }
}