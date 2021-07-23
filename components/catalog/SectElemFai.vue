<template>
    <div>
        <div class="items">
            <item v-for="(item, index) in items" :key="index" :item="item" :wideItem="wideItem" />
        </div>
    </div>
</template>

<script>

    import Item from '~/components/catalog/item/Item.vue'

    export default {
        name: 'SectionElements',
        props: ['items','wideItem'],
        components: {
            Item,
        },
    }
</script>
