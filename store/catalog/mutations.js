export default {
    setSections(state, payload) {
        state.sections = payload;
    },
    setFavorites(state, payload) {
        state.favorites.items = payload.items;
        state.favorites.count = payload.count;
    },
}