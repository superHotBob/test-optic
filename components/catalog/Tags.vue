<template>
    <div class="tags">
        <div class="tags__tag" v-for="(tag, index) in tags" :key="index">
            <nuxt-link :to="tag.URL" :class="{'active': $route.path == tag.URL}">{{tag.TITLE}}</nuxt-link>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['tags']
}
</script>
