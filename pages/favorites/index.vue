<!--<template>-->
<!--<div>-->
<!--    <div class="content-header">-->
<!--        <div class="main-container">-->
<!--            <h2>Список желаемого</h2>-->
<!--            <ul class="breadcrumbs">-->
<!--                <li><nuxt-link to="/">Главная</nuxt-link></li>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </div>-->
<!--    <template v-if="items.length !== 0">-->
<!--        <section-elements class="main-container catalog__items" :items="items"></section-elements>-->
<!--        <item-preview />-->
<!--    </template>-->
<!--    <div class="main-container catalog__items" v-else>-->
<!--        Список желаемого пуст-->
<!--    </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->

<!--import SectionElements from '~/components/catalog/SectionElements.vue'-->
<!--import ItemPreview from '~/components/catalog/item/ItemPreview.vue'-->

<!--export default {-->

<!--    transition: 'fade',-->
<!--    components: {-->
<!--        SectionElements,-->
<!--        ItemPreview,-->
<!--    },-->
<!--    computed: {-->
<!--        items() {-->
<!--            var items = this.$store.state.catalog.favorites.items;-->
<!--            if (items)-->
<!--                return JSON.parse(JSON.stringify(items));-->
<!--            return false;-->
<!--        }-->
<!--    },-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--    <div>-->
<!--        <div class="content-header">-->
<!--            <div class="main-container">-->
<!--                <h2>Список желаемого</h2>-->
<!--                <ul class="breadcrumbs">-->
<!--                    <li><nuxt-link to="/">Главная</nuxt-link></li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="main-container catalog__items">-->
<!--            <div v-if="items" class="items">-->
<!--                <item v-for="(item, index) in items" :key="index" :item="item" :wideItem="wideItem" />-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                Список желаемого пуст-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--    import Item from '~/components/catalog/item/itemFavorite.vue'-->

<!--    export default {-->
<!--        transition: 'fade',-->
<!--        components: {-->
<!--            Item,-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                wideItem:false-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            items() {-->
<!--                var items = this.$store.state.catalog.favorites.items;-->
<!--                console.log(items);-->
<!--                if (items)-->
<!--                    return JSON.parse(JSON.stringify(items));-->
<!--                return false;-->
<!--            }-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<template>-->
<!--    <div>-->
<!--        <div class="content-header">-->
<!--            <div class="main-container">-->
<!--                <h2>Список желаемого</h2>-->
<!--                <ul class="breadcrumbs">-->
<!--                    <li><nuxt-link to="/">Главная</nuxt-link></li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="main-container catalog__items">-->
<!--            <div v-if="items" class="items">-->
<!--                <item v-for="(item, index) in items" :key="index" :item="item" :wideItem="wideItem" />-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                Список желаемого пуст-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--    import Item from '~/components/catalog/item/ItemCompare.vue'-->

<!--    export default {-->
<!--        transition: 'fade',-->
<!--        components: {-->
<!--            Item,-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                wideItem:false-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            items() {-->
<!--                var items = this.$store.state.catalog.favorites.items;-->

<!--                if (items)-->
<!--                    return JSON.parse(JSON.stringify(items));-->
<!--                return false;-->
<!--            }-->
<!--        },-->
<!--    }-->
<!--</script>-->
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
        <div class="main-container catalog__items">
            <div v-if="items.length" class="items">
                <item v-for="item in items" :key="item.id" :item="item" :wideItem="wideItem" />
            </div>

            <div >
                {{messageEmpty}}
            </div>
        </div>
    </div>
</template>

<script>

    import Item from '~/components/catalog/item/itemFavorite.vue'

    export default {
        transition: 'fade',
        components: {
            Item,
        },
        data() {
            return {
                wideItem:false,
                locStr: null,
                messageEmpty: null
            }
        },

    beforeMount()
    {

        this.locStr=localStorage.favorites;

        if (this.locStr=='[]')
        {
            this.messageEmpty='Список желаемого пуст';
        }
    },
        computed: {
            items() {
                const items = this.$store.state.catalog.favorites.items;
                if (items) { 
                    console.log(JSON.parse(JSON.stringify(items)));              
                    return JSON.parse(JSON.stringify(items));
                } else {
                    let spisok = this.messageEmpty ;
                	spisok ='Список желаемого пуст'
                    return false;
                } 
            }
        }
    }
</script>
