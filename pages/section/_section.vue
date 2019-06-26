<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{result.seometa.title}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <sticky-scroll sWrapper=".catalog" sScroll=".filter">
        <div class="catalog catalog main-container">
            <div class="catalog__col-1">
                <smart-filter v-bind:items="result.filter.items" />
            </div>
            <div class="catalog__col-2">
                <div class="catalog__top">
                    <p class="catalog__items-found hidden-desktop">Найдено {{result.filter.count_items}} {{wording(result.filter.count_items)}}</p>
                    <sort-by class="catalog__sort" />
                    <div class="catalog__view item-view">
                        <button class="item-view__narrow" :class="{'active' : !wideItem}" @click="wideItem = false; $root.$emit('recalcSlider')">narrow</button>
                        <button class="item-view__wide" :class="{'active' : wideItem}" @click="wideItem = true; $root.$emit('recalcSlider')">wide</button>
                    </div>
                </div>
                <tags v-bind:tags="result.tags" />
                <section-elements
                    class="catalog__items"
                    :class="{'catalog__items--wide': wideItem}"
                    v-bind:items="result.section.items"
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

export default {
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
                last: 'Last'
            },
            wideItem: true,
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
    },
    methods: {
        onChangePagen: function () {
            this.$router.push({ name: this.$route.name, params:{tag:this.$route.params.tag, filter:this.$route.params.filter, pagen:this.pagen}, query: this.$route.query});
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
                this.result.section.items = items;
            })
        }
    },
    watch: {
        '$route' (to, from) {
            this.$store.dispatch('catalog/LOAD_SECTION', {'params':to.params, 'query':to.query}).then((response) => {
                
                if (response.hasOwnProperty('error'))
                    this.$nuxt.error({ statusCode: response.statusCode, message: response.error.message })
                
                this.result = response.result;
                this.pagen = response.pagen;
            })
        },
    },
    updated() {
        this.$root.$emit('recalcSlider')
    },
    
    async asyncData({ store, error, params, query }) {
        let response = await store.dispatch('catalog/LOAD_SECTION', {'params':params, 'query':query})

        if (response.hasOwnProperty('error'))
            error({ statusCode: response.statusCode, message: response.error.message })

        console.log(response);
        return {
            result: response.result,
            pagen: response.pagen,
            loadPage: response.pagen,
        }
    },
    validate ({ params }) {
        if (params.pagen)
            return /^\d+$/.test(params.pagen)

        return true;
    },
    head() {
        return {
            title: this.result.seometa.title
        }
    }
}
</script>
