import qs from 'qs';

export default {
    async state({commit, getters}) {
        let order = await this.$axios.$get(getters.getEndpointOrder);
        commit('setOrder', order);
        commit('setSessid', order);
        commit('setLocation', order);
    },
    async request({commit, getters}, payload) {
        let result = await this.$axios.$post(getters.getEndpointOrder, qs.stringify(payload));
        
        if (result.order.hasOwnProperty('ERROR') && payload['soa-action'] === 'saveOrderAjax')
            return result.order;

        if (result.success === 'N')
            return

        if (result.order.hasOwnProperty('ID'))
            return result;

        commit('setOrder', result);
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
        console.log(result);
        return result;
    }
}