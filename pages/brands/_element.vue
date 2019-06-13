<template>
    <div>
        <div class="content-header">
            <div class="main-container">
                <h2>{{item.name}}</h2>
                <ul class="breadcrumbs">
                    <li><nuxt-link to="/">Главная</nuxt-link></li>
                    <li><nuxt-link to="/brands">Бренды</nuxt-link></li>
                </ul>
            </div>
        </div>
        <div>
            <img v-lazy="item.src" alt="">
            <div v-html="item.detail_text"></div>
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ params, $axios, error }) {

        var item = false,
            items = false;

        return Promise.all([
            $axios.get(`/api/v1/iblock/list/?iblock=8&count=1&properties[0]=name&filter[CODE]=${params.element}`),
            $axios.get(`/api/v1/catalog/elements/?filter[PROPERTY_brand_VALUE]=${params.element}`)
        ]).then((response) => {

            if (response[0].data.items[0]) {
                item = response[0].data.items[0];
                items = response[1].data,section.items;
            }
            else
                error({ statusCode: 404, message: '404' })

            return {
                item:item,
                items:items
            }
        }).catch((e) => {
            if (e.response[0].status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
    },
}
</script>

