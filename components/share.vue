<template>
    <div class="social" v-bind:class="customClass">
        <a @click="share(`https://vk.com/share.php?url=${url}&utm_source=share2`,'Вконтакте')" rel="nofollow noopener" target="_blank" title="ВКонтакте">
            <svg width='18' height="18" fill="#000"><use href="#svg-vk"/></svg>
            Вконтакте
        </a>
        <a @click="share(`https://www.facebook.com/sharer.php?src=sp&u=${url}&utm_source=share2`, 'Фейсбук')" rel="nofollow noopener" target="_blank" title="Фейсбук">
            <svg width='15' height="15" fill="#000"><use href="#svg-facebook"/></svg>
            Фейсбук
        </a>
        <a @click="share(`https://pinterest.com/pin/create/button/?url=${url}&utm_source=share2`, 'Пинтерест')" rel="nofollow noopener" target="_blank" title="Пинтерест">
            <svg width='15' height="15" fill="#000"><use href="#svg-pinterest"/></svg>
            Пинтерест
        </a>
        <a @click="share(`https://twitter.com/intent/tweet?url=${url}&utm_source=share2`, 'Твиттер')" rel="nofollow noopener" target="_blank" title="Твиттер">
            <svg width='15' height="15" fill="#000"><use href="#svg-twitter"/></svg>
            Твиттер
        </a>
    </div>
</template>

<script>
export default {
    props: {
        customClass: String
    },
    data() {
        return {
            url:''
        }
    },
    methods: {
        share(url,title) {
            var win = window.open(url, title, "width=400,height=400");
        }
    },
    mounted() {   
        this.url = window.location.href;
    },
}
</script>


