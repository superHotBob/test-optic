export default {
    setView(state, payload) {
        state.view = payload;
    },
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
    setCompare(state, payload) {
        state.compare.items = payload.items;
        state.compare.count = payload.count;
    },
}