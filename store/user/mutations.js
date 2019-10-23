export default {
    setUser(state, payload) {
        state.user = payload.user;
        state.logged = payload.logged;
        state.sessid = payload.sessid;
    },
    setName(state, payload) {
        state.user.name = payload;
    },
    setLastName(state, payload) {
        state.user.last_name = payload;
    },
    setSecondName(state, payload) {
        state.user.second_name = payload;
    },
    setEmail(state, payload) {
        state.user.email = payload;
    },
    setPhone(state, payload) {
        state.user.phone = payload;
    },
    setCity(state, payload) {
        state.city = payload
    }
}
