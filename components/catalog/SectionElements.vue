<template>
    <div>
      <div class="items">
        <item v-for="(item, index) in items" :key="index" v-bind:item="item"></item>
      </div>
      <item-preview/>
    </div>
</template>

<script>

import Item from '~/components/catalog/item/Item.vue'
import ItemPreview from '~/components/catalog/item/ItemPreview.vue'

export default {
    name: 'SectionElements',
    components: {
      Item,
      ItemPreview
    },
    props: ['items'],
}
</script>
  

