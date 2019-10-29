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
        <div class="brand main-container">
            <div class="brand__img">
                <img v-if="item.src" v-lazy="item.src" alt="">
            </div>
            <div class="brand__text" v-html="item.detail_text"></div> 
        </div>
        <div class="main-container brand__item-slider">
            <item-slider items="recommended" :elements="items" :ref="recommendeds">
                <template v-if="item.properties.link">
                    <!-- <nuxt-link  :to="item.properties.link.value">
                        
                    </nuxt-link>    -->
                    <div tag="span"> Товары {{item.name}}</div>
                </template>
                <template v-else>
                    Товары {{item.name}}
                </template>
            </item-slider>
        </div>
    </div>
</template>

<script>

import ItemSlider from '~/components/sliders/ItemSlider.vue'

export default {
    components: {
        ItemSlider,
    },
    asyncData({ params, $axios, error }) {

        var item = false,
            items = false;

        return Promise.all([
            $axios.get(`/api/v1/iblock/list/?iblock=8&count=1&properties[0]=name&filter[CODE]=${params.element}`),
        ]).then((response) => {
            if (response[0].data.items[0]) {
                item = response[0].data.items[0];
            }
            else
                error({ statusCode: 404, message: '404' })

            return Promise.all([
                $axios.get(`/api/v1/catalog/elements/?filter[PROPERTY_brand_VALUE]=${item.name}`)
            ]).then( products => {
                items = products[0].data.section.items;
                return {
                    item:item,
                    items:items
                }
            }); 
        }).catch((e) => {
            if (e.response[0].status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
    },
}
</script>

<style lang="scss">
.brand {
    display: flex;
    margin-top: 40px;
    font-size: 13px;
    color: #4a4a4a;
    &__img {
        width: 300px;
        padding-right: 30px;
        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            margin: 0 auto;
        }
    }
    &__text {
        width: calc(100% - 300px - 30px);
    }
    &__item-slider {
        margin-top: 70px;
    }
}
.brand__item-slider{
    .simple{
        cursor:initial !important;
    }
}

@media (max-width: 768px) {
    .brand {
        display: block;
        &__img {
            width: 100%;
            margin-bottom: 20px;
            padding: 0;
        }
        &__text {
            width: 100%;
        }
        &__item-slider {
            margin-top: 50px;
        }
    }
}
</style>
