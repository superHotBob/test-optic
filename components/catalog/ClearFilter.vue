<template>
    <button type="button" @click="clear">Сбросить</button>
</template>

<script>
export default {
    methods: {
        clear() {
            this.$router.push({ name: 'filter', params: {filter: ['clear']}})
        }
    }
}
</script>

<style lang="scss">

</style>
