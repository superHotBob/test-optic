export default {
    async state({commit, getters}) {
        let sections = await this.$axios.$get(getters.getEndpointSections);
        commit('setSections', sections);
    },
}