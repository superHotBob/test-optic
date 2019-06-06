<template>
    <section-elements class="main-container catalog__items" :items="items"></section-elements>
</template>

<script>

import SectionElements from '~/components/catalog/SectionElements.vue'

export default {
    transition: 'fade',
    components: {
        SectionElements,
    },
    computed: {
        items() {
            return JSON.parse(JSON.stringify(this.$store.state.catalog.favorites.items));
        }
    },
}
</script>
