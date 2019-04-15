<template>
    <div>
        <form>
            <input v-for="arItem in arResult.HIDDEN" :key="arItem.ID" type="hidden"/>
            <div v-for="arItem in arResult.ITEMS" :key="arItem.CODE">
                <div v-if="arItem.DISPLAY_TYPE === 'F'">
                    <ul>
                        <li v-for="ar in arItem.VALUES" :key="ar.ID">
                            <label>
                                <input v-on:click="change(ar.URL_ID,arItem.ID)"
                                    type="checkbox"
                                    :value="ar.URL_ID"
                                    :checked="ar.CHECKED"
                                />
                                {{ar.VALUE}}
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
        <button class="btn btn-secondary" v-on:click="clear">Clear</button>
    </div>
</template>

<script>
export default {
    name: 'SmartFilter',
    props: {
      arResult: Object,
    },
    data() {
        return {
            timer:null,
            prop: {},
        }
    },
    methods: {
        clear() {
            this.$router.push({ name: 'filter', params: {filter: ['clear']}})
        },
        reload() {
            var allValues, url_params = [];
            
            for (let property in this.arResult.ITEMS) {
                if (!this.arResult.ITEMS[property].PRICE) {
                    allValues = [];
                    for (let value in this.arResult.ITEMS[property].VALUES) {
                        if(this.arResult.ITEMS[property].VALUES[value].CHECKED) {
                            allValues.push(this.arResult.ITEMS[property].VALUES[value].URL_ID);
                        }
                    }
                    this.prop[this.arResult.ITEMS[property].CODE] = allValues;
                }
            }
            
            for (let key in this.prop) {
                if (this.prop[key].length > 0)
                    url_params.push(key + '-is-' + this.prop[key].join('-or-'));
            }

            if (url_params.length == 0) 
                url_params.push('clear');


            this.$router.push({ name: 'filter', params: {filter: url_params}})
        },
        change(value, id) {

            for(let prop in this.arResult.ITEMS[id].VALUES) {
                
                if (this.arResult.ITEMS[id].VALUES[prop].URL_ID !== value)
                    continue;
                
                if (this.arResult.ITEMS[id].VALUES[prop].CHECKED) 
                    this.arResult.ITEMS[id].VALUES[prop]['CHECKED'] = false;
                else
                    this.arResult.ITEMS[id].VALUES[prop]['CHECKED'] = true;
            }

            if(!!this.timer)
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
