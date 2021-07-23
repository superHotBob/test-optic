<template>
<div>
    <div class="content-header">
        <div class="main-container">
           <h2> {{result.seometa.headline}}</h2>
            <ul class="breadcrumbs">
                <li v-for="(item, index) in result.seometa.bredcrumbs" :key="index">

                    <nuxt-link :to="item.LINK.LINK">{{item.TITLE}}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
    <sticky-scroll sWrapper=".catalog" sScroll=".filter">
        <template v-if="valuableLinze()">
            <div class="main-container">
                <div class="visulable">Указана стоимость 2-х линз</div>
            </div>
            <style>
                /*@media (max-width: 768px) {
                    .tags {
                        top: 72px !important;
                    }
                }*/
            </style>
        </template>
        <div class="catalog catalog main-container">
            <div class="catalog__col-1">
                <smart-filter v-bind:items="result.filter.items" />
            </div>
            <div class="catalog__col-2">
                <a href="" id="top-block"></a>
                <div class="catalog__top">
                    <p class="catalog__items-found hidden-desktop">Найдено {{result.filter.count_items}} {{wording(result.filter.count_items)}}</p>
                    <sort-by class="catalog__sort" />
                    <div class="catalog__view item-view">
                        <button class="item-view__narrow" :class="{'active' : !wideItem}" @click="changeView(false)">narrow</button>
                        <button class="item-view__wide" :class="{'active' : wideItem}" @click="changeView(true)">wide</button>
                    </div>
                </div>
                <tags v-bind:tags="result.tags" />
                <section-elements
                    class="catalog__items"
                    :class="{'catalog__items--wide': wideItem}"
                    v-bind:items="result.section.items"
                    :filter="result"
                    :wideItem="wideItem"
                />
                <pagination
                    v-model="pagen"
                    :page-count="result.section.pagen.count"
                    :classes="paginationClasses"
                    :labels="customLabels"
                    @change="onChangePagen"
                />
                <button v-if="loadPage < result.section.pagen.count" type="button" @click="onLoadItems()" class="catalog__ajax-pagen button black hidden-desktop">Показать еще</button>
                <clear-filter class="catalog__reset-filter button hidden-desktop" />
                <item-slider/>
            </div>
        </div>
    </sticky-scroll>
</div>
</template>

<script>

import util from '~/mixins/util.js'
import Tags from '~/components/catalog/Tags.vue'
import SmartFilter from '~/components/catalog/SmartFilter.vue'
import ClearFilter from '~/components/catalog/ClearFilter.vue'
import SectionElements from '~/components/catalog/SectionElements.vue'
import SortBy from '~/components/catalog/SortBy.vue'
import StickyScroll from '~/components/StickyScroll.vue'
import Pagination from '~/components/Pagination.vue'
import ItemSlider from '~/components/sliders/ItemSlider.vue'
import { mapGetters } from 'vuex'

export default {
    transition: 'fade',
    mixins: [util],
    data() {
        return {
            paginationClasses: {
                ul: 'pagination',
                li: 'pagination__li',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'pagination__btn'
            },
            customLabels: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last',
            },
            title_section: ''
        }
    },
    components: {
        StickyScroll,
        SectionElements,
        SmartFilter,
        ClearFilter,
        SortBy,
        Pagination,
        Tags,
        ItemSlider
    },
    computed: {
        ...mapGetters({
            wideItem: 'catalog/getView',
        }),
    },
    methods: {
        valuableLinze() {
             return new String(this.result.section.items[0].URL).indexOf('linzy') !== -1
        },
        changeView(bool) {
            this.$store.commit('catalog/setView', bool)
            this.$root.$emit('recalcSlider');
        },
        onChangePagen: function () {
            this.$router.push({ 
                name: this.$route.name, 
                params: {
                    tag:this.$route.params.tag, 
                    filter:this.$route.params.filter, 
                    pagen:this.pagen
                }, 
                query: this.$route.query
            },
            () => {
                setTimeout(function(){
                    window.scrollTo({
                        top: document.getElementById('top-block').offsetTop,
                        behavior: "smooth"
                    })
                }, 500)
            })
        },
        onLoadItems: function() {
            var items = [];

            if (this.loadPage < this.result.section.pagen.count) {
                this.loadPage++;
            }
            this.$store.dispatch('catalog/LOAD_SECTION', {'pagen':this.loadPage,'params':this.$route.params, 'query':this.$route.query})
            .then( response => {
                if (!Array.isArray(this.result.section.items)) {
                    for (let key in this.result.section.items) {
                        items.push(this.result.section.items[key]);
                    }
                } else {
                    items = this.result.section.items;
                }

                for (let key in response.result.section.items) {
                    items.push(response.result.section.items[key]);
                }
                var top = window.pageYOffset
                this.result.section.items = items;
                setTimeout(function(){
                    if (top > 0) window.scrollTo(top, top)
                }, 500)
            })
        }
    },
    watch: {
        '$route' (to, from) {
            //console.log("query", query)
            this.$store.dispatch('catalog/LOAD_SECTION', {'params':to.params, 'query':to.query}).then((response) => {
                if (response.hasOwnProperty('error'))
                    this.$nuxt.error({ statusCode: response.statusCode, message: response.error.message })
                console.log('routeresponse', response)
                this.result = response.result;
                this.pagen = response.pagen;
            })
        },
    },

    async asyncData({ store, error, params, query }) {
        let response = await store.dispatch('catalog/LOAD_SECTION', {'params':params, 'query':query})
        //let title=document.getElementsByClassName('router-link-exact-active')['0'].innerHTML
        //console.log("async", response);
        if (response.hasOwnProperty('error'))
            error({ statusCode: response.statusCode, message: response.error.message })

        console.log('asyncresponse', response)
        return {
            result: response.result,
            pagen: response.pagen,
            loadPage: response.pagen,
            // title: title
        }
    },
    validate ({ params }) {
        if (params.pagen)
            return /^\d+$/.test(params.pagen)
        return true;
    },
    head() {
        return {
            title: this.result.seometa.title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.result.seometa.description }
            ]
        }
    }
}
</script>
