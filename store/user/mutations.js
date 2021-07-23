export default {
    setUser(state, payload) {
        state.user = payload.user;
        state.logged = payload.logged;
        state.sessid = payload.sessid;
        //console.log('mutation/setUser', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setName(state, payload) {
        state.user.name = payload;
        //console.log('mutation/setName', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setLastName(state, payload) {
        state.user.last_name = payload;
        //console.log('mutation/setLastName', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setSecondName(state, payload) {
        state.user.second_name = payload;
        //console.log('mutation/setSecondName', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setEmail(state, payload) {
        state.user.email = payload;
        //console.log('mutation/setEmail', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setPhone(state, payload) {
        state.user.phone = payload;
        //console.log('mutation/setPhone', {
        //    state: state,
        //    respnse: payload
        //});
    },
    setCity(state, payload) {
        state.city = payload
        //console.log('mutation/setCity', {
        //    state: state,
        //    respnse: payload
        //});
    }
}
