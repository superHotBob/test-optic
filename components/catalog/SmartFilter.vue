<template>
    <div>
        <form>
            <div v-for="item in items" :key="item.CODE">
                <div class='price' v-if="item.price">
                    <vue-slider 
                        :min="item.values.min" 
                        :max="item.values.max" 
                        v-model="item.values.array"
                        @change="change()">
                    </vue-slider>
                </div>
                <div v-else>
                    <div v-if="item.display_type === 'F'">
                        <ul>
                            <li v-for="(value, index) in item.values" :key="index">
                                <label>
                                    <input
                                        type="checkbox"
                                        v-model="value.checked"
                                        v-on:click="change()"
                                    />
                                    {{value.name}}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
        <button class="btn btn-secondary" v-on:click="clear">Clear</button>
    </div>
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
