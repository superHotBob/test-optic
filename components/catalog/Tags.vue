<template>
    <div ref="tags" class="tags" :class="{active:active}">
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
            active:false,
            item: 0
        }
    },
    methods: {
        dropdown() {
            var tags = this.$refs.tags.getElementsByClassName('tags__tag')
            
            this.active = !this.active
            for(let i = 0; i < tags.length; i++) {
                if (this.active) {
                    tags[i].style.display = 'inline-block'
                } else if (i > this.item) {
                    tags[i].style.display = 'none'    
                }  
            }
        },
        tagsResize() {
            var tags = this.$refs.tags.getElementsByClassName('tags__tag'),
                width = this.$refs.tags.offsetWidth - 65,
                widthTags = 0,
                widthWidth = window.innerWidth 
            
            for(let i = 0; i < tags.length; i++) {
                
                tags[i].style.display = 'inline-block'
                widthTags += tags[i].offsetWidth
                if (widthTags > width) {
                    if (widthWidth <= 768) 
                        tags[i].style.display = 'none'
                } else {
                    this.item = i
                }
            }
        }
    },
    mounted() {
        this.tagsResize();
        window.onresize = (event) => {
            this.tagsResize();
        }
    },
    destroyed() {
        window.onresize = null
    }
}
</script>
