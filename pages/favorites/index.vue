<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Список желаемого</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <section-elements class="main-container catalog__items" :items="items"></section-elements>
    <item-preview />
</div>
</template>

<script>
import SectionElements from '~/components/catalog/SectionElements.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'

export default {
    transition: 'fade',
    components: {
        SectionElements,
        ItemPreview,
    },
    computed: {
        items() {
            return JSON.parse(JSON.stringify(this.$store.state.catalog.favorites.items));
        }
    },
}
</script>
