<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Список сравнения</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="main-container catalog__items">
        <div v-if="items" class="items">
            <item v-for="(item, index) in items" :key="index" :item="item" :wideItem="wideItem" />
        </div>
        <div v-else>
            Список сравнение пуст
        </div>
    </div>
</div>
</template>

<script>

import Item from '~/components/catalog/item/ItemCompare.vue'

export default {
    transition: 'fade',
    components: {
        Item,
    },
    data() {
        return {
            wideItem:false
        }
    },
    computed: {
        items() {
            var items = this.$store.state.catalog.compare.items;
            
            if (items)
                return JSON.parse(JSON.stringify(items));
            return false;
        }
    },
}
</script>