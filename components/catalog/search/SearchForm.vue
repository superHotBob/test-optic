<template>
    <form class="page-header__search" aria-label="Поиск">
        <button class="btn-icon hidden-desktop" type="button" @click="headerSearch = !headerSearch">
            <svg width="15" height="15"><use href="#svg-search"/></svg>
            Поиск
        </button>
        <label class="textfield light" :class="{'active': headerSearch}">
            <input @input="search($event.target.value)" type="text" placeholder="Поиск...">
            <button class="textfield__icon" type="button">
                <svg width="15" height="15"><use href="#svg-search"/></svg>
                Поиск
            </button>
        </label>
        <div>
            <div v-for="(item, index) in items" :key="index">
                {{item.CURRENT.NAME}}
            </div>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            items: {},
            timer:null,
            headerSearch: false,
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
       async load(search) {
            let response = await this.$axios.$get(`/api/v1/catalog/?count=5&q=${search}`);
            this.items = response.section.items;
            console.log(this.items);
       }
    },
}
</script>
