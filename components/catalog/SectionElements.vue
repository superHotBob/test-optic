<template>
<div>
    <div class="items">
        <item v-for="(item, index) in items" :key="index" :item="item" :filter="filter" :wideItem="wideItem" />
    </div>
</div>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue'

export default {
    name: 'SectionElements',
    props: ['items','wideItem','filter'],
    components: {
        Item,
    }
}
</script>
