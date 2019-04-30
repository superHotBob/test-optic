export default {
    setSections(state, payload) {
        state.sections = payload;
    },
    setBestsellers(state, payload) {
        state.bestsellers = payload.items;
    },
    setNewItems(state, payload) {
        state.newItems = payload.items;
    },
    setFavorites(state, payload) {
        state.favorites.items = payload.items;
        state.favorites.count = payload.count;
    },
}