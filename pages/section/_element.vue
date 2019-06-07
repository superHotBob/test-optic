<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{element.CURRENT.NAME}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <detail v-bind:item="element"/>
</div>
</template>

<script>

import Detail from '~/components/catalog/element/Element.vue'

export default {
    components: {
        Detail
    },
    asyncData({ params, $axios, error }) {
        return $axios.get(`/api/v1/catalog/detail/${params.element}/`).then((response) => {
            console.log(response.data)
            return {
                element:response.data.element
            }
        }).catch((e) => {
            if (e.response.status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
    }
}
</script>
