<template>
    <div>
        <div class="content-header">
            <div class="main-container">
                <h2>Результаты поиска</h2>
                <ul class="breadcrumbs">
                    <li><nuxt-link to="/">Главная</nuxt-link></li>
                </ul>
            </div>
        </div>
        <div class="main-container catalog__items" v-if="items">
            <section-elements :items="items"></section-elements>
            <pagination
                class="d-flex justify-content-center flex-wrap"
                v-model="pagen"
                :page-count="pagen_count"
                :classes="paginationClasses"
                :labels="customLabels"
                @change="onChangePagen"
            />
            <item-preview />
        </div>
        <div v-else>
            Ничего не найдено
        </div>
    </div>
</template>

<script>
import SectionElements from '~/components/catalog/SectionElements.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'
import Pagination from '~/components/Pagination.vue'

export default {
    transition: 'fade',
    components: {
        SectionElements,
        ItemPreview,
        Pagination
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
    methods: {
        onChangePagen: function () {
            this.$router.push({ name: this.$route.name, params:{pagen:this.pagen}, query: this.$route.query});
        },
    },
    watch: {
        '$route' (to, from) {
            this.$store.dispatch('catalog/LOAD_SEARCH', {'params':to.params, 'query':to.query}).then((response) => {
                
                if (response.hasOwnProperty('error'))
                    this.$nuxt.error({ statusCode: response.statusCode, message: response.error.message })
                
                this.items = response.items;
                this.pagen_count = response.pagen_count;
                this.pagen = response.pagen;
            })
        },
    },
    async asyncData({ store, error, params, query }) {
        let response = await store.dispatch('catalog/LOAD_SEARCH', {'params':params, 'query':query})

        if (response.hasOwnProperty('error'))
            error({ statusCode: response.statusCode, message: response.error.message })

        return {
            items:response.items,
            pagen_count:response.pagen_count,
            pagen:response.pagen
        }
    },
}
</script>
