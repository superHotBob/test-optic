import qs from 'qs';

export default {
    async getParameters({commit, getters}, params) {
    	var query = []
    	for (let key in params) {
            query += `&${key}=${params[key]}`;
        }
        query = query.substring(1);
        query = "?"+query;
        let response = await this.$axios.get('/api/v1/subscribe/'+query);
        commit('setSubscribe', params);
        return {
        	mutation: response.data.mutation,
        	user: response.data.user,
        	errors: response.data.errors,
        	success: response.data.success,
        	list_sub: response.data.list_sub,
        	requests: response.data.requests
        }
    }
}