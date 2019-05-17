<template>
    <div class="main-container">
      <div style="display: flex; flex-wrap: wrap; margin-left: -15px; margin-right: -15px;">
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
  

