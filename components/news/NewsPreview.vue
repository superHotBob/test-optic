<template>
<div class="news-preview">
    <a class="news-preview__top-link" href="/news/item">
        <div class="news-preview__img">
            <img :src="item.imgUrl" alt="">
        </div>
        <b>{{item.name}}</b>
    </a>
    <div class="news-preview__stats">
        <span class="news-preview__stat">
            <svg width="12" height="12"><use href="#svg-calendar"/></svg>
            {{item.date}}
        </span>
        <span class="news-preview__stat">
            <svg width="12" height="12"><use href="#svg-comment"/></svg>
            {{item.comments}}
        </span>
    </div>
    <p>{{item.shortDesc}}</p>
    <a class="news-preview__read-more" href="#0">
        Читать далее
        <svg width="15" height="8"><use href="#svg-arrow-right"/></svg>
    </a>
</div>
</template>

<script>
export default {
    props: ['item'],
}
</script>


