export default {
    async sections({commit, getters}) {
        let sections = await this.$axios.$get(getters.getEndpointSections);
        commit('setSections', sections);
    },
    async favorites({commit, getters}) {
        let favorites = await this.$axios.$get(getters.getEndpointFavorites);
        commit('setFavorites', favorites.section);
    },
}