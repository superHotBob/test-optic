export default {
    setOrder(state, payload) {
        state.order = payload.order;
        state.locations = payload.locations;
    },
    setLocation(state, payload) {
        state.locations = payload.locations;
    },
    setSessid(state, payload) {
        state.sessid = payload.sessid;
    },
    setLocationList(state, payload) {
        state.locationList = payload.data.ITEMS;
    },
    setLocationShow(state, payload) {
        state.locationShow = payload;
    },
    setError(state, payload) {
        state.order.ERROR = payload;
    }
}
  