<template>
    <div>
        <item v-bind:item="element"/>
    </div>
</template>

<script>

import item from '~/components/catalog/element/element.vue'

export default {
    components: {
        item
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
