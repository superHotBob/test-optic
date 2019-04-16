export default {
    setUser(state, payload) {
        state.user = payload.user;
        state.logged = payload.logged;
        console.log(payload)
    },
}
  