<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>{{item.name}}</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/news">Новости</nuxt-link></li>
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
                <span class="news-item__stat" v-if="item.comments">
                    <svg width="12" height="12"><use href="#svg-comment"/></svg>
                    {{item.comments}}
                </span>
            </div>
            <div v-html="item.detail_text"></div>
            <div class="news-item__share">
                <span>Поделиться:</span>
                <div class="social">
                    <a href="#0">
                        <svg width='18' height="18" fill="#000"><use href="#svg-vk"/></svg>
                        Вконтакте
                    </a>
                    <a href="#0">
                        <svg width='15' height="15" fill="#000"><use href="#svg-facebook"/></svg>
                        Фейсбук
                    </a>
                    <a href="#0">
                        <svg width='15' height="15" fill="#000"><use href="#svg-pinterest"/></svg>
                        Пинтерест
                    </a>
                    <a href="#0">
                        <svg width='15' height="15" fill="#000"><use href="#svg-twitter"/></svg>
                        Твиттер
                    </a>
                </div>
            </div>
            <div class="news-item__comments">
                <h2 class="news-item__header">Комментарии</h2>
            </div>
            <div>
                <h2 class="news-item__header">Написать комментарий</h2>
                <form @submit.prevent="validateForm('comment')" data-vv-scope="comment" ref="comment">
                    <label class="textfield half">
                        <input name="name" type="text" placeholder="Ваше имя">
                    </label>
                    <label class="textfield half">
                        <input v-validate="'required|email'" name="email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                        <span v-show="errors.has('comment.email')" class="error">{{ errors.first('comment.email') }}</span>
                    </label>
                    <label class="textfield">
                        <textarea name="textarea" cols="30" rows="10" placeholder="Текст комментария" required></textarea>
                    </label>
                    <button class="button black submit" type="submit">Отправить</button>
                </form>
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
import NewsPreview from '~/components/news/NewsPreview.vue'

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
            console.log(response.data)
            this.news = response.data.items;
        })
    },
    data() {
        return {
            news:false
        }
    },
    components: {
        NewsPreview,
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
