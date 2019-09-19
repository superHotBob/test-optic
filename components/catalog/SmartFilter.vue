<template>
<form class="filter">
    <h2>Фильтр</h2>
    <button class="filter__f-toggle button black hidden-desktop" type="button"  @click="showFilter = !showFilter">
        {{showFilter ? 'Скрыть фильтры' : 'Показать фильтры'}}
    </button>
    <b-collapse class="filter__collapse" id="collapse-filter" v-model="showFilter">
        <div>
            <button class="filter__heading" type="button" v-b-toggle="'collapse-categories'">Категории</button>
            <b-collapse id="collapse-categories" visible>
                <ul class="filter__categories">
                    <li v-for="section in sections" :key="section.CODE">
                        <nuxt-link :to="{ name: 'section', params: {section: section.CODE }}" >{{section.NAME}}</nuxt-link>
                    </li>
                </ul>
            </b-collapse>
        </div>
        <template v-for="(item, itemIndex) in items">
            <div class="filter__slider" v-if="item.price && item.values.min !== item.values.max" :key="item.CODE">
                <button class="filter__heading" type="button" v-b-toggle="'collapse-'+itemIndex">Цена</button>
                <b-collapse :id="'collapse-'+itemIndex">
                    <vue-slider
                        v-model="item.values.array"
                        :min="item.values.min"
                        :max="item.values.max"
                        :dotSize="15"
                        :height="1"
                        tooltip="none"
                        contained="true"
                        @change="change()"
                    >
                    </vue-slider>
                    <p>от {{minPrice}} до {{maxPrice}}</p>
                </b-collapse>
            </div>
        </template>
        <template v-for="(item, itemIndex) in items">
            <div v-if="!item.price && item.values" :key="item.code">
                <button class="filter__heading" type="button" v-b-toggle="'collapse-'+itemIndex">{{item.name}}</button>
                <b-collapse :id="'collapse-'+itemIndex">
                    <ul class="filter__square" v-if="item.display_type === 'F'">
                        <li v-for="(value, index) in item.values" :key="index">
                            <label :class="{'active': value.checked, 'disabled': value.disabled, 'color': value.image}">
                                <input
                                    type="checkbox"
                                    v-model="value.checked"
                                    @click="change()"
                                    :disabled="value.disabled"
                                />
                                <img alt="" v-if="value.image" v-lazy="value.image" :title="value.name">
                                <span v-if="!value.image">{{value.name}}</span>
                            </label>
                        </li>
                    </ul>
                </b-collapse>
            </div>
        </template>
    </b-collapse>
    <clear-filter class="filter__reset button" />
</form>
</template>

<script>

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import ClearFilter from '~/components/catalog/ClearFilter.vue'

import { mapGetters } from 'vuex'

export default {
    name: 'SmartFilter',
    components: {
        VueSlider,
        ClearFilter,
    },
    props: {
      items: Object,
    },
    data() {
        return {
            timer: null,
            showFilter: false,
        }
    },
    computed: {
        ...mapGetters({
            sections: 'catalog/getSections',
        }),
        minPrice() {
            return this.items.base.values.array[0].toLocaleString('ru-RU')
        },
        maxPrice() {
            return this.items.base.values.array[1].toLocaleString('ru-RU')
        },
    },
    methods: {
        reload() {
            var properties = {}, values, url_params = [];

            for (let item in this.items) {
                if (this.items[item].price)
                {
                    var priceFilter = 'price-',
                        bool = false
                    
                    if (this.items[item].values.min !== this.items[item].values.array[0]) {
                        priceFilter += this.items[item].code + '-from-' + this.items[item].values.array[0]
                        bool = true
                    }

                     if (this.items[item].values.max !== this.items[item].values.array[1]) {
                        priceFilter += '-to-' + this.items[item].values.array[0]
                        bool = true
                    }

                    if (bool) {
                        url_params.push(priceFilter);
                    }
                    
                }
                else
                {
                    values = [];
                    
                    for (let value in this.items[item].values) {
                        if(this.items[item].values[value].checked) {
                            values.push(this.items[item].values[value].value);
                        }
                    }

                    properties[this.items[item].code] = values;
                }
            }

            for (let key in properties) {
                if (properties[key].length > 0)
                    url_params.push(key + '-is-' + properties[key].join('-or-'));
            }

            this.$router.push({ name: 'filter', params: {filter: url_params}, query: this.$route.query})
        },
        change() {

            if (!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.reload();
                this.$root.$emit('recalcSlider');
            }, 500);
        },
    },
}
</script>
