<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Новости</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><a>Новости</a></li>
            </ul>
        </div>
    </div>
    <div class="main-container">
        <div class="news">
            <div class="news__block" v-for="(item, index) in news" :key="index">
                <news-preview :item="item" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NewsPreview from '~/components/news/NewsPreview.vue'

export default {
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
}
</script>
