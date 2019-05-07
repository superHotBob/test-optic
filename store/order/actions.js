import qs from 'qs';

export default {

    STATE ({commit, getters}) {
        return this.$axios.$get(getters.getEndpointOrder)
                .then((result) => {
                    commit('setOrder', result);
                    commit('setSessid', result);
                    commit('setLocation', result);
                })
    },

    async request({commit, getters}, payload) {
        let result = await this.$axios.$post(getters.getEndpointOrder, qs.stringify(payload));
        
        if (result.success === 'N')
            return

        if (result.order.hasOwnProperty('ERROR') && payload['soa-action'] === 'saveOrderAjax') {
            commit('setError', result.order.ERROR);
            return result.order;
        }

        if (result.order.hasOwnProperty('ID'))
            return result;

        commit('setOrder', result);
    },

    locationShow({commit}, bool) {
        commit('setLocationShow', bool);
    },

    async locations({commit, getters}, search) {
        let payload = {
            'select': {
                'DISPLAY':'NAME.NAME',
                'VALUE':'ID'
            },
            'select[1]':'CODE',
            'additionals[1]':'PATH',
            'filter':{
                '=PHRASE':search,
                '=NAME.LANGUAGE_ID':'ru',
                '=SITE_ID':'s1'
            },
            'version':'2',
            'PAGE_SIZE':'10',
            'PAGE':'0'
            
        }
        
        let result = await this.$axios.$post(getters.getEndpointLocation, qs.stringify(payload));
        commit('setLocationList', result);
        commit('setLocationShow', true);
        return result;
    }
}