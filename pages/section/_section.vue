<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{result.seometa.title}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><a>Женщинам</a></li>
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
                    <p class="catalog__items-found hidden-desktop">Найдено {{54}} {{wording(54)}}</p>
                    <sort-by class="catalog__sort" />
                    <div class="catalog__view item-view">
                        <button class="item-view__narrow" :class="{'active' : !wideItem}" @click="wideItem = false">narrow</button>
                        <button class="item-view__wide" :class="{'active' : wideItem}" @click="wideItem = true">wide</button>
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
                <button class="catalog__ajax-pagen button black hidden-desktop">Показать еще N товаров из Z</button>
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
    },
    asyncData({ params, $axios, error }) {

        var url,
            pagen = 1,
            filter = 'clear';

        if (params.filter)
            filter = params.filter;

        if (params.pagen)
            pagen = Number(params.pagen);

        if (params.tag)
            url = `/api/v1/catalog/${params.section}/${params.tag}/?PAGEN_1=${pagen}`;
        else
            url = `/api/v1/catalog/${params.section}/filter/${filter}/apply/?PAGEN_1=${pagen}`;

        
        return $axios.get(url)
        .then((response) => {
            return {
                result: response.data,
                pagen: pagen,
            }
        }).catch((e) => {
            if (e.response.status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
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
