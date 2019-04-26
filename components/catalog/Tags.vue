<template>
    <div>
        <div v-for="(tag, index) in tags" :key="index">
            <nuxt-link :to="tag.URL">{{tag.TITLE}}</nuxt-link>
        </div>
    </div>    
</template>

<script>
export default {
    props: ['tags']
}
</script>
