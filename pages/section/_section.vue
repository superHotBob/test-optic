<template>
    <div>
        <h1>{{seometa.title}}</h1>
        <smart-filter v-bind:arResult="result.smartFilter.arResult"></smart-filter>
        <section-elements v-bind:arResult="result.section.arResult"></section-elements>
        <pagination v-model="pagen"
            :page-count="result.section.arResult.PAGEN.NavPageCount"
            :classes="bootstrapPaginationClasses"
            :labels="customLabels"
            @change="onChangePagen"></pagination>
    </div>
</template>

<script>

import SectionElements from '~/components/catalog/SectionElements.vue'
import SmartFilter from '~/components/catalog/SmartFilter.vue'
import Pagination from '~/components/Pagination.vue'

export default {
    components: {
        SectionElements,
        SmartFilter,
        Pagination
    },
    methods: {
        onChangePagen: function () {
            console.log(this.$route);
            this.$router.push({ name: this.$route.name, params:{filter:this.$route.params.filter, pagen:this.pagen}});
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

        var pagen = 1,
            filter = 'clear';
        
        if (params.filter)  
            filter = params.filter;

        if (params.pagen)  
            pagen = Number(params.pagen);

        return $axios.get(`/api/v1/catalog/${params.section}/filter/${filter}/apply/?PAGEN_1=${pagen}`)
        .then((res) => {
            return { 
                result: res.data,
                pagen: pagen,
                seometa: res.data.seometa,
            }
        }).catch((e) => {
            console.log()
            if (e.response.status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
    },
    head() {
        return {
            title: this.seometa.title
        }
    }
}
</script>
