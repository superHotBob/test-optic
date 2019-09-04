<template>
    <div class="tags" :class="{active:active}">
        <div class="tags__tag" v-for="(tag, index) in tags" :key="index">
            <nuxt-link :to="tag.URL" :class="{'active': $route.path == tag.URL}">{{tag.TITLE}}</nuxt-link>
        </div>
        <span class="arrow" @click="dropdown()"></span>
    </div>    
</template>

<script>
export default {
    props: ['tags'],
    data() {
        return {
            active:false
        }
    },
    methods: {
        dropdown() {
            console.log('ok');
            this.active = !this.active
        }
    }
}
</script>
