<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{element.CURRENT.NAME}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link :to="'/' + element.SECTION_CODE">{{element.SECTION_NAME}}</nuxt-link></li>
            </ul>
        </div>
    </div>
    <detail v-bind:item="element"/>
</div>
</template>

<script>

import Detail from '~/components/catalog/element/Element.vue'

export default {
    transition: 'fade',
    components: {
        Detail
    },
    asyncData({ params, $axios, error }) {
        console.log(`/api/v1/catalog/${params.section}/${params.element}/`)
        return $axios.get(`/api/v1/catalog/${params.section}/${params.element}/`).then((response) => {
            console.log(response.data.element)
            return {
                element:response.data.element,
                seometa:response.data.seometa,
            }
        }).catch((e) => {
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
