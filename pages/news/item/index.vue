<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{item.name}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/news">Блог</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="news-item main-container">
        <div class="news-item__main">
            <img class="news-item__img" :src="item.src" alt="">
            <b class="news-item__name">{{item.name}}</b>
            <div class="news-item__stats">
                <span class="news-item__stat" v-if="item.date">
                    <svg width="12" height="12"><use href="#svg-calendar"/></svg>
                    {{item.date}}
                </span>
                <span class="news-item__stat" v-if="item.properties.BLOG_COMMENTS_CNT.value">
                    <svg width="12" height="12"><use href="#svg-comment"/></svg>
                    {{item.properties.BLOG_COMMENTS_CNT.value}}
                </span>
            </div>
            <div v-html="item.detail_text"></div>
            <div class="news-item__share">
                <span>Поделиться:</span>
                <share/>
            </div>
            <div class="news-item__comments">
                <h2 class="news-item__header">Комментарии</h2>
            </div>
            <div>
                <h2 class="news-item__header">Написать комментарий</h2>
                    <p v-if="!isLogged">
                    Чтобы оставить комментарий,
                    <button class="btn-simple" @click="$bvModal.show('auth-modal')">авторизируйтесь</button>.
                </p>
                <comments iblock_id="7" :element_id="item.id" :rating_show="false"/>
            </div>
        </div>
        <div class="news-item__relative-news" v-if="news.length">
            <h2 class="news-item__header">Похожие посты</h2>
            <news-preview  v-for="(rel, index) in news" :key="index" :item="rel"/>
        </div>
    </div>
</div>
</template>

<script>

import Comments from '~/components/comments/Comments.vue'
import NewsPreview from '~/components/news/NewsPreview.vue'
import Share from '~/components/share.vue'
import { mapGetters } from 'vuex'

export default {
    asyncData({ params, $axios, error }) {

        var item = false;

        return $axios.get(`/api/v1/iblock/list/?iblock=7&count=1&properties[0]=name&filter[CODE]=${params.element}`).then((response) => {
            
            if (response.data.items[0])
                item = response.data.items[0];
            else
                error({ statusCode: 404, message: '404' })

            return {
                item:item
            }
        }).catch((e) => {
            if (e.response.status === 404) {
                error({ statusCode: 404, message: e.message })
            }
        })
    },
    mounted() {
        this.$axios.get(`/api/v1/iblock/list/?iblock=7&count=3&properties[0]=post&filter[PROPERTY_post]=${this.item.id}`).then((response) => {
            //console.log(response.data)
            this.news = response.data.items;
        })
    },
    data() {
        return {
            news:false
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged',
        })
    },
    components: {
        NewsPreview,
        Comments,
        Share
    },
    methods: {
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    this.$refs[scope].submit()
                }
            });
        },
    },
}
</script>
