<template>
    <form class="page-header__search" aria-label="Поиск">
        <button class="btn-icon hidden-desktop" type="button" @click="headerSearch = !headerSearch">
            <svg width="15" height="15"><use href="#svg-search"/></svg>
            Поиск
        </button>
        <label @click="showSearch = true" ref="input" class="textfield light" :class="{'active': headerSearch}">
            <input @input="search($event.target.value)" type="text" placeholder="Поиск...">
            <button class="textfield__icon" type="button">
                <svg width="15" height="15"><use href="#svg-search"/></svg>
                Поиск
            </button>
        </label>
        <div ref="result" v-show="showSearch">
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
            showSearch: false
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
            this.showSearch = true;
            console.log(this.items);
       },
       documentClick(e) {
            let el = this.$refs.result,
                target = e.target,
                input = this.$refs.input;
            
            if ((el !== target) && !el.contains(target) && (input !== target) && !input.contains(target)) {
                this.showSearch=false;
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.documentClick)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.documentClick)
    }
}
</script>
