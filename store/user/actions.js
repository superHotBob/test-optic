import qs from 'qs';

export default {
    STATE ({commit, getters}) {
        return this.$axios.$get(getters.getEndpointUser)
                .then((user) => {                
                    commit('setUser', user);
                })
    },

    async UPDATE({commit, getters}, payload) {
        let response = this.$axios.$post(getters.getEndpointUpdate,
            qs.stringify(payload)
        );

        if (response['status'] == 'OK')
            commit('setUser', response['user']);

        return response;
    },

    async REGISTER({commit, getters}, payload) {
        let user = await this.$axios.post(
            getters.getEndpointRegister,
            qs.stringify({
                'REGISTER[NAME]':payload.name,
                'REGISTER[LAST_NAME]':payload.lastName,
                'REGISTER[SECOND_NAME]':payload.secondName,
                'REGISTER[LOGIN]':payload.username,
                'REGISTER[PASSWORD]':payload.password,
                'REGISTER[CONFIRM_PASSWORD]':payload.password1,
                'REGISTER[EMAIL]':payload.email,
                'REGISTER[PERSONAL_PHONE]':payload.phone,
                'register_submit_button':'Y'
            })
        );
        return user;
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
    },
    socservices ({commit}, payload) {
        commit('setUser', payload);
    }
}