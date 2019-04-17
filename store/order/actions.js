import qs from 'qs';

export default {
    async state({commit, getters}) {
        let order = await this.$axios.$get(getters.getEndpoint);
        commit('setOrder', order);
        commit('setSessid', order);
    },
    async request({commit, getters}, payload) {
        let result = await this.$axios.$post(getters.getEndpoint, qs.stringify(payload));
        
        if (result.success === 'N')
            return

        if (result.order.hasOwnProperty('ID'))
            return result;

        commit('setOrder', result);
    }
}