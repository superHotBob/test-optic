<template>
    <div>
        <sticky-scroll />
        <h1>{{result.seometa.title}}</h1>
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

import SectionElements from '~/components/catalog/SectionElements.vue'
import SmartFilter from '~/components/catalog/SmartFilter.vue'
import Tags from '~/components/catalog/Tags.vue'
import Pagination from '~/components/Pagination.vue'

import StickyScroll from '~/components/StickyScroll.vue'

export default {
    components: {
        SectionElements,
        SmartFilter,
        Pagination,
        Tags,
        StickyScroll,
    },
    methods: {
        onChangePagen: function () {
            this.$router.push({ name: this.$route.name, params:{tag:this.$route.params.tag, filter:this.$route.params.filter, pagen:this.pagen}});
        },
    },
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
            }
        }
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
