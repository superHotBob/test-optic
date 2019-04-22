import qs from 'qs';

export default {
    async state({commit, getters}) {
        let user = await this.$axios.$get(getters.getEndpointUser);
        commit('setUser', user);
    },
    async login({commit, getters}, payload) {
        let user = await this.$axios.post(
            getters.getEndpointLogin,
            qs.stringify({
                'USER_LOGIN':payload.username,
                'USER_PASSWORD':payload.password,
                'USER_REMEMBER':payload.remember,
                'AUTH_FORM':'Y',
                'TYPE':'AUTH'
            })
        );

        commit('setUser', user.data);
        return user;
    },
    async logout({commit, getters}) {
        let user = await this.$axios.get(getters.getEndpointLogout);
        commit('setUser', user);
        return user;
    }
}