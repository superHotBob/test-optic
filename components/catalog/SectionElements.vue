<template>
<div>
    <div class="items">
        <item v-for="(item, index) in items" :key="index" :item="item" :wideItem="wideItem" />
    </div>
    <item-preview />
</div>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'

export default {
    name: 'SectionElements',
    props: {
        items: {
            type: Object,
        },
        wideItem: {
            type: Boolean,
            default: () => false,
        },
    },
    components: {
      Item,
      ItemPreview,
    },
}
</script>
