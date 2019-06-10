import qs from 'qs';
import { cacheAction } from 'vuex-cache';

export default {
    'CACHE_STATE': cacheAction(
        ({ cache, commit }) => (
            cache.dispatch('CATALOG')
                .then(([sections, bestsellers, newitems]) => {                
                    commit('setSections', sections);
                    commit('setBestsellers', bestsellers.section);
                    commit('setNewItems', newitems.section);
                })
        )
    ),

    'CACHE_SERVICE': cacheAction(
        ({ cache }) => (
            cache.dispatch('SERVICE')
                .then((result) => {                
                    return result
                })
        )
    ),

    GET_COMPARE ({ commit, getters }) {
        return this.$axios.$get(getters.getEndpointCompare)
                .then((result) => {
                    commit('setCompare', result);
                });
    },

    GET_FAVORITES ({ commit, getters }) {
        return this.$axios.$get(getters.getEndpointFavorites)
                .then((result) => {
                    commit('setFavorites', result.section);
                });
    },
    
    async SERVICE () {
        let [swiperData, topData, banerData, bottomData] = await Promise.all([
            this.$axios.get(`/api/v1/iblock/list/?iblock=2&properties[0]=name`),
            this.$axios.get(`/api/v1/iblock/list/?iblock=5&count=3&properties[0]=link&filter[PROPERTY_position_VALUE]=top`),
            this.$axios.get(`/api/v1/iblock/list/?iblock=4&count=1&properties[0]=link`),
            this.$axios.get(`/api/v1/iblock/list/?iblock=5&count=2&properties[0]=link&filter[PROPERTY_position_VALUE]=bottom`)
        ])
        return {
            swiperItems: swiperData.data.items,
            topItems: topData.data.items,
            banerItems: banerData.data.items,
            bottomItems: bottomData.data.items
        }
    },

    CATALOG ({ getters }) {
        const filter = {
            'filter':{
                'PROPERTY_new_VALUE':'Да'
            }
        }
    
        const promise = Promise.all([
            this.$axios.$get(getters.getEndpointSections),
            this.$axios.$get(getters.getEndpointBestsellers),
            this.$axios.$post(getters.getEndpointElements, qs.stringify(filter))
        ]);
    
        return promise;
    },

    LOAD_SECTION ({ state }, payload) {
        var url,
            pagen = 1,
            query = '',
            filter = 'clear';

        if (payload.params.filter)
            filter = payload.params.filter;

        if (payload.params.pagen)
            pagen = Number(payload.params.pagen);

        for (let key in payload.query) {
            query += `&${key}=${payload.query[key]}`;
        }

        if (payload.params.tag)
            url = `/api/v1/catalog/${payload.params.section}/${payload.params.tag}/?PAGEN_1=${pagen}${query}`;
        else
            url = `/api/v1/catalog/${payload.params.section}/filter/${filter}/apply/?PAGEN_1=${pagen}${query}`;
        
        return this.$axios.get(url)
        .then((response) => {
            return {
                result: response.data,
                pagen: pagen,
            }
        }).catch((e) => {
            if (e.response.status === 404) {
                return {
                    error: e,
                    statusCode: 404
                }
            }
        })
    },
  
}