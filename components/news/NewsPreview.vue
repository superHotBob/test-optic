<template>
<div class="news-preview">
     <nuxt-link v-if="item.code"
        class="news-preview__top-link"
        :to="{path: '/news/' + item.code}"
    >
        <div class="news-preview__img">
            <img :src="item.src" alt="">
        </div>
        <b>{{item.name}}</b>
    </nuxt-link>
    <div class="news-preview__stats">
        <span v-if="item.date" class="news-preview__stat">
            <svg width="12" height="12"><use href="#svg-calendar"/></svg>
            {{item.date}}
        </span>
        <span class="news-preview__stat">
            <svg width="12" height="12"><use href="#svg-comment"/></svg>
            {{item.comments}}
        </span>
    </div>
    <p>{{item.description}}</p>
    <nuxt-link v-if="item.code"
        class="news-preview__read-more"
        :to="{path: '/news/' + item.code}"
    >
        Читать далее
        <svg width="15" height="8"><use href="#svg-arrow-right"/></svg>
    </nuxt-link>
</div>
</template>

<script>
export default {
    props: ['item'],
}
</script>


