export default {
    setOrder(state, payload) {
        state.order = payload.order;
    },
    setLocation(state, payload) {
        state.locations = payload.locations;
    },
    setSessid(state, payload) {
        state.sessid = payload.sessid;
    },
}
  