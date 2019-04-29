<template>
    <form class="page-header__search" aria-label="Поиск">
        <button class="btn-icon hidden-desktop" type="button" @click="btnClick" ref="btn">
            <svg width="15" height="15"><use href="#svg-search"/></svg>
            Поиск
        </button>
        <label @click="showSearch = true" ref="input" class="textfield light" :class="{'active': showSearch}">
            <input @input="search($event.target.value)" type="text" placeholder="Поиск...">
            <button class="textfield__icon" type="button">
                <svg width="15" height="15"><use href="#svg-search"/></svg>
                Поиск
            </button>
        </label>
        <ul ref="result" v-show="(showSearch && count)" class="page-header__search-list">
            <li v-for="(item, index) in items" :key="index">
                <nuxt-link
                    :to="{ name: 'element', params: {section: item.SECTION_CODE, element: item.CODE }}"
                    v-html="item.CURRENT.NAME"
                    @click.native.prevent="showSearch = false"
                ></nuxt-link>
            </li>
            <li v-if="count > 5" class="page-header__all-results">
                <nuxt-link to="#0">Все результаты</nuxt-link>
            </li>
        </ul>
    </form>
</template>

<script>

export default {
    data() {
        return {
            items: {},
            timer:null,
            headerSearch: false,
            showSearch: false,
            count: 0
        }
    },
    methods: {
        search(value) {
            
            if (!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.load(value);
            }, 500);
        },
        formatSearch(items, input) {
            for (const key in items) {
                items[key].CURRENT.NAME = items[key].CURRENT.NAME.replace(
                    new RegExp(input, 'gi'), str => `<span>${str}</span>`
                )
            }
            this.items = items;
        },
        async load(search) {
            let response = await this.$axios.$get(`/api/v1/catalog/?count=5&q=${search}`);
            this.count = response.section.count;
            this.formatSearch(response.section.items, search);
            this.showSearch = true;
        },
        documentClick(e) {
            let el = this.$refs.result,
                target = e.target,
                btn = this.$refs.btn,
                input = this.$refs.input;
            
            if ((el !== target) && !el.contains(target) && (input !== target) && !input.contains(target) && (btn !== target) && !btn.contains(target)) {
                this.showSearch=false;
            }
        },
        btnClick() {
            this.showSearch = !this.showSearch;
            setTimeout(() => { 
                this.$refs.input.click();
            }, 0);
        },
    },
    mounted() {
        window.addEventListener('click', this.documentClick)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.documentClick)
    }
}
</script>
