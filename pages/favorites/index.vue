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
    <template v-if="items.length">
        <section-elements class="main-container catalog__items" :items="items"></section-elements>
        <item-preview />
    </template>
    <div v-else>
        Список желаемого пуст
    </div>
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
            var items = this.$store.state.catalog.favorites.items;
            
            if (items)
                return JSON.parse(JSON.stringify(items));
            return false;
        }
    },
}
</script>
