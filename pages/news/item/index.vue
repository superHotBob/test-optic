<template>
<div class="news-item main-container">
    <div class="news-item__main">
        <img class="news-item__img" :src="item.imgUrl" alt="">
        <b class="news-item__name">{{item.name}}</b>
        <div class="news-item__stats">
            <span class="news-item__stat">
                <svg width="12" height="12"><use href="#svg-calendar"/></svg>
                {{item.date}}
            </span>
            <span class="news-item__stat">
                <svg width="12" height="12"><use href="#svg-comment"/></svg>
                {{item.comments}}
            </span>
        </div>
        <div v-html="item.detailedDesc"></div>
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
    <div class="news-item__relative-news">
        <h2 class="news-item__header">Похожие новости</h2>
        <news-preview  v-for="(rel, index) in relativeNews" :key="index" :item="rel"/>
    </div>
</div>
</template>

<script>
import NewsPreview from '~/components/news/NewsPreview.vue'

export default {
    // props: ['item'],
    data() {
        return {
            news: {
                'news-001': {
                    name: 'Выбираем офисные линзы',
                    date: '03-08-2016',
                    comments: '0',
                    shortDesc: 'Офисные линзы предназначены для комфортной работы на близких и средних расстояниях. Рекомендуется для тех, кто работает за компьютером, длительное время читает и работает с документами. Офисные линзы не предназначены для использования вне помещения и вождения автомобиля!',
                    detailedDesc: '<h3>Lorem ipsum dolor sit amet.</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus et neque debitis voluptatum animi. Rem officiis delectus saepe suscipit quia. Soluta incidunt rerum non et natus quas, magnam quisquam odit!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>',
                    imgUrl: 'https://home-optic.ru/upload/iblock/c03/c0308e1af5304cea8c03b48299cf7645.jpg',
                },
                'news-002': {
                    name: 'Какие линзы для очков выбрать',
                    date: '03-08-2016',
                    comments: '0',
                    shortDesc: 'Выбор линз для очков, это ответственный момент, к которому следует отнестись серьёзно, так как от этого зависит здоровье и комфорт глаз.',
                    detailedDesc: '<h3>Lorem ipsum dolor sit amet.</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus et neque debitis voluptatum animi. Rem officiis delectus saepe suscipit quia. Soluta incidunt rerum non et natus quas, magnam quisquam odit!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>',
                    imgUrl: 'https://home-optic.ru/upload/iblock/88e/88ed289d3823021d012ebd86c43b3c8e.jpg',
                },
                'news-003': {
                    name: 'Выбираем офисные линзы',
                    date: '03-08-2016',
                    comments: '0',
                    shortDesc: 'Выбирая очки в салоне оптики, очень важно подобрать оправу, которая подходит по цвету к глаз, волосам, а также сочетающуюся с формой лица.',
                    detailedDesc: '<h3>Lorem ipsum dolor sit amet.</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus et neque debitis voluptatum animi. Rem officiis delectus saepe suscipit quia. Soluta incidunt rerum non et natus quas, magnam quisquam odit!</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>',
                    imgUrl: 'https://home-optic.ru/upload/iblock/eaa/eaab437d9686dfce5054f133ea22e479.jpg',
                },
            },
        }
    },
    components: {
        NewsPreview,
    },
    computed: {
        // временные свойства:
        item() {
            let array = Object.values(this.news);
            return array[0]
        },
        relativeNews() {
            let array = Object.values(this.news);
            return array.slice(1, 3)
        }
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
