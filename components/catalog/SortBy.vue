<template>
<div class="sort-by">
    <div class="sort-by__desktop hidden-mobile">
        <nuxt-link
            class="sort-by__btn asc"
            :class="{'active': (currentSort.name == 'name' && currentSort.order == 'asc')}"
            :to="{query: { sortName: 'name', sortOrder: 'desc' }}"
            v-if="currentSort.order == 'asc'"
        >По названию</nuxt-link>
        <nuxt-link
            class="sort-by__btn desc"
            :class="{'active': (currentSort.name == 'name' && currentSort.order == 'desc')}"
            :to="{query: { sortName: 'name', sortOrder: 'asc' }}"
            v-else
        >По названию</nuxt-link>
        <nuxt-link
            class="sort-by__btn asc"
            :class="{'active': (currentSort.name == 'rating' && currentSort.order == 'asc')}"
            :to="{query: { sortName: 'rating', sortOrder: 'desc' }}"
            v-if="currentSort.order == 'asc'"
        >По популярности</nuxt-link>
        <nuxt-link
            class="sort-by__btn desc"
            :class="{'active': (currentSort.name == 'rating' && currentSort.order == 'desc')}"
            :to="{query: { sortName: 'rating', sortOrder: 'asc' }}"
            v-else
        >По популярности</nuxt-link>
        <nuxt-link
            class="sort-by__btn asc"
            :class="{'active': (currentSort.name == 'price' && currentSort.order == 'asc')}"
            :to="{query: { sortName: 'price', sortOrder: 'desc' }}"
            v-if="currentSort.order == 'asc'"
        >По цене</nuxt-link>
        <nuxt-link
            class="sort-by__btn desc"
            :class="{'active': (currentSort.name == 'price' && currentSort.order == 'desc')}"
            :to="{query: { sortName: 'price', sortOrder: 'asc' }}"
            v-else
        >По цене</nuxt-link>
    </div>
    <div class="sort-by__mobile hidden-desktop">
        <button class="sort-by__toggle" :class="{'active': listOpened}" @click="listOpened = !listOpened">
            <a class="sort-by__option" :class="{'asc': (currentSort.order == 'asc'), 'desc': (currentSort.order == 'desc')}">
                <span>{{currentSort.description}}</span>
            </a>
        </button>
        <ul class="sort-by__list" :class="{'active': listOpened}">
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option asc" :to="{query: { sortName: 'name', sortOrder: 'asc' }}">
                    <span>По названию</span>
                </nuxt-link>
            </li>
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option desc" :to="{query: { sortName: 'name', sortOrder: 'desc' }}">
                    <span>По названию</span>
                </nuxt-link>
            </li>
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option asc" :to="{query: { sortName: 'rating', sortOrder: 'asc' }}">
                    <span>По популярности</span>
                </nuxt-link>
            </li>
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option desc" :to="{query: { sortName: 'rating', sortOrder: 'desc' }}">
                    <span>По популярности</span>
                </nuxt-link>
            </li>
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option asc" :to="{query: { sortName: 'price', sortOrder: 'asc' }}">
                    <span>По цене</span>
                </nuxt-link>
            </li>
            <li @click="listOpened = false">
                <nuxt-link class="sort-by__option desc" :to="{query: { sortName: 'price', sortOrder: 'desc' }}">
                    <span>По цене</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            listOpened: false,
        }
    },
    computed: {
        currentSort() {
            let query = this.$route.query;
            let description = '';
            let order = '';
            let name = '';

            if (query.sortName == 'rating') {
                name = 'rating'
                description = 'По популярности'
            }
            else if (query.sortName == 'price') {
                name = 'price'
                description = 'По цене'
            }
            else  {
                name = 'name'
                description = 'По названию'
            }

            if (query.sortOrder == undefined) {
                order = 'asc'
            } else {
                order = query.sortOrder
            }

            return {
                name,
                order,
                description,
            }
        }
    }
}
</script>
