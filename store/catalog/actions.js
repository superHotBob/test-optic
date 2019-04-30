import qs from 'qs';

export default {
    async sections({commit, getters}) {
        let sections = await this.$axios.$get(getters.getEndpointSections);
        commit('setSections', sections);
    },
    async favorites({commit, getters}) {
        let favorites = await this.$axios.$get(getters.getEndpointFavorites);
        commit('setFavorites', favorites.section);
    },
    async bestsellers({commit, getters}) {
        let bestsellers = await this.$axios.$get(getters.getEndpointBestsellers);
        commit('setBestsellers', bestsellers.section);
    },
    async newItems({commit, getters}) {
        
        let filter, newItems;
        
        filter = {
            'filter':{
                'PROPERTY_new_VALUE':'Да'
            }
        }

        newItems = await this.$axios.$post(getters.getEndpointElements, qs.stringify(filter));
        commit('setNewItems', newItems.section);
    },
}