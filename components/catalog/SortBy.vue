<template>
<div class="sort-by">
    <div class="sort-by__desktop hidden-mobile">
        <button
            class="sort-by__btn"
            :class="{'asc': sort.byAsc,
                    'desc': !sort.byAsc,
                    'active': sort.params.name == true}"
            @click="sortBy('name')"
        >По названию</button>
        <button
            class="sort-by__btn"
            :class="{'asc': sort.byAsc,
                    'desc': !sort.byAsc,
                    'active': sort.params.rating == true}"
            @click="sortBy('rating')"
        >По популярности</button>
        <button
            class="sort-by__btn"
            :class="{'asc': sort.byAsc,
                    'desc': !sort.byAsc,
                    'active': sort.params.price == true}"
            @click="sortBy('price', true)"
        >По цене</button>
    </div>
    <div class="sort-by__mobile hidden-desktop">
        <button class="sort-by__toggle">
            <span
                class="sort-by__option"
                :class="{'asc': sort.byAsc, 'desc': !sort.byAsc}"
                v-if="sort.params.name == true"
            >По названию</span>
            <span
                class="sort-by__option"
                :class="{'asc': sort.byAsc, 'desc': !sort.byAsc}"
                v-else-if="sort.params.rating == true"
            >По популярности</span>
            <span
                class="sort-by__option"
                :class="{'asc': sort.byAsc, 'desc': !sort.byAsc}"
                v-else-if="sort.params.price == true"
            >По цене</span>
        </button>
        <ul class="sort-by__list">
            <li><span class="sort-by__option asc">По названию</span></li>
            <li><span class="sort-by__option desc">По названию</span></li>
            <li><span class="sort-by__option asc">По популярности</span></li>
            <li><span class="sort-by__option desc">По популярности</span></li>
            <li><span class="sort-by__option asc">По цене</span></li>
            <li><span class="sort-by__option desc">По цене</span></li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: {
        sort: {
            type: Object,
            default() {
                return {
                    params: {
                        name: true,
                        rating: false,
                        price: false,
                    },
                    byAsc: true,
                }
            },
        },
    },
    methods: {
        sortBy(attr, by) {
            if (this.sort.params[attr] == false) {
                for (let prop in this.sort.params) {
                    this.sort.params[prop] = false;
                }
                this.sort.params[attr] = true;

                if (by !== undefined) {
                    this.sort.byAsc = by;
                }
            } else if (by == undefined) {
                this.sort.byAsc = !this.sort.byAsc;
            }
        },
        toggleList() {

        }
    }
}
</script>
