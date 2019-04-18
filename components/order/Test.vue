<template>
    <div>
        <div v-for="location in locations" :key="location.CODE">
            <span>{{location.DISPLAY}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['locations']
}
</script>


