<template>
    <div>
        <!-- <sticky-scroll sWrapper=".ss" sScroll=".ss__filter">
            <div class="ss main-container">
                <div class="ss__col-1">
                    <div class="ss__filter">
                        <p v-for="(item, index) in [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]" :key="index">row with a kinda long name #{{index}}</p>
                    </div>
                </div>
                <div class="ss__col-2">
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                    <h2>SECOND COLUMN SECOND COLUMN SECOND COLUMN SECOND COLUMN</h2>
                </div>
            </div>
        </sticky-scroll> -->
        <div class="content-header">
            <div class="main-container">
                <h2>{{result.seometa.title}}</h2>
                <ul class="breadcrumbs">
                    <li><nuxt-link to="/">Главная</nuxt-link></li>
                    <li><a>Женщинам</a></li>
                </ul>
            </div>
        </div>
        <tags v-bind:tags="result.tags"/>
        <smart-filter v-bind:items="result.filter.items"></smart-filter>
        <section-elements v-bind:items="result.section.items"></section-elements>
        <pagination v-model="pagen"
            :page-count="result.section.pagen.count"
            :classes="bootstrapPaginationClasses"
            :labels="customLabels"
            @change="onChangePagen"></pagination>
    </div>
</template>

<script>

import Tags from '~/components/catalog/Tags.vue'
import SmartFilter from '~/components/catalog/SmartFilter.vue'
import SectionElements from '~/components/catalog/SectionElements.vue'
import StickyScroll from '~/components/StickyScroll.vue'
import Pagination from '~/components/Pagination.vue'

export default {
    data() {
        return {
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
            customLabels: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            },
        }
    },
    components: {
        StickyScroll,
        SectionElements,
        SmartFilter,
        Pagination,
        Tags,
    },
    methods: {
        onChangePagen: function () {
            this.$router.push({ name: this.$route.name, params:{tag:this.$route.params.tag, filter:this.$route.params.filter, pagen:this.pagen}});
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

<style lang="scss">
.ss {
    display: flex;
    &__col-1 {
        width: 300px;
        background-color: red;
    }
    &__col-2 {
        width: 1%;
        flex-grow: 1;
        background-color: lightgreen;
    }
    &__filter {
        width: 300px;
        padding-top: 40px; // no padding to parent element, only to scroll itself
        background-color: lightcoral;
        border-bottom: 1px solid transparent; // border or flex, so that last margin-bottom doesn't collapse
    }
}
</style>
