<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Новости</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="main-container">
        <div class="news">
            <div class="news__block" v-for="(item, index) in items" :key="index">
                <news-preview :item="item" />
            </div>
        </div>
        <pagination
            class="d-flex justify-content-center flex-wrap"
            v-model="pagen"
            :page-count="pagen_count"
            :classes="paginationClasses"
            :labels="customLabels"
            @change="onChangePagen"
        />
    </div>
</div>
</template>

<script>

import Pagination from '~/components/Pagination.vue'
import NewsPreview from '~/components/news/NewsPreview.vue'

export default {
    async asyncData({ store, error, params }) {
        let response = await store.dispatch('catalog/LOAD_NEWS', {'params':params})

        if (response.hasOwnProperty('error'))
            error({ statusCode: response.statusCode, message: response.error.message })

        return {
            items:response.items,
            pagen_count:response.pagen_count,
            pagen:response.pagen
        }
    },
    methods: {
        onChangePagen: function () {
            this.$router.push({ name: this.$route.name, params:{pagen:this.pagen}});
        },
    },
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
        }
    },
    components: {
        NewsPreview,
        Pagination
    },
}
</script>
