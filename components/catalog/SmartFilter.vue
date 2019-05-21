<template>
<form class="filter">
    <h2>Фильтр</h2>
    <div class="filter__prop">
        <button class="filter__heading" type="button" v-b-toggle="'collapse-420'">Категории</button>
        <b-collapse class="filter__values" id="collapse-420" visible>
            <ul class="filter__categories">
                <li>Оправы</li>
                <li>Линзы для очков</li>
            </ul>
        </b-collapse>
    </div>
    <template v-for="(item, itemIndex) in items">
        <div class='filter__prop' v-if="item.price" :key="item.CODE">
            <button class="filter__heading" type="button" v-b-toggle="'collapse-'+itemIndex">Цена</button>
            <b-collapse class="filter__values" :id="'collapse-'+itemIndex" visible>
                <vue-slider 
                    :min="item.values.min" 
                    :max="item.values.max" 
                    v-model="item.values.array"
                    @change="change()">
                </vue-slider>
            </b-collapse>
        </div>
        <div class="filter__prop" v-else :key="item.CODE">
            <button class="filter__heading" type="button" v-b-toggle="'collapse-'+itemIndex">{{item.name}}</button>
            <b-collapse class="filter__values" :id="'collapse-'+itemIndex" visible>
                <ul v-if="item.display_type === 'F'">
                    <li v-for="(value, index) in item.values" :key="index">
                        <label>
                            <input
                                type="radio"
                                v-model="value.checked"
                                v-on:click="change()"
                            />
                            {{value.name}}
                        </label>
                    </li>
                </ul>
            </b-collapse>
        </div>
    </template>
    <button class="btn btn-secondary" type="button" v-on:click="clear">Сбросить</button>
</form>
</template>

<script>

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'SmartFilter',
    components: {
        VueSlider
    },
    props: {
      items: Object,
    },
    data() {
        return {
            timer:null,
        }
    },
    methods: {
        clear() {
            this.$router.push({ name: 'filter', params: {filter: ['clear']}})
        },
        reload() {
            var properties = {}, values, url_params = [];

            for (let item in this.items) {
                if (this.items[item].price) 
                {
                    url_params.push('price-' + this.items[item].code + '-from-' + this.items[item].values.array.join('-to-'));
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

            this.$router.push({ name: 'filter', params: {filter: url_params}})
        },
        change() {
                
            if (!!this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => { 
                this.reload();
            }, 500);
        },
    },
}
</script>

<style>
    .price {
        margin-left: 20px;
        max-width: 300px;
    }
</style>
