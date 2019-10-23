<template>
<b-modal class="delivery-region" id="delivery-region" style="color: black;" hide-header hide-footer>
    <button class="modal-close hidden-mobile" @click="$bvModal.hide('delivery-region')"></button>
    <button class="modal-back hidden-desktop" @click="$bvModal.hide('delivery-region'); $bvModal.show('header-menu')"></button>
    <h3>Укажите ваш регион </h3>
    <form>
        <label class="textfield">
            <input type="text" placeholder="Москва" @input="regionFilter" ref="regionInput">
            <button class="textfield__icon" type="button">
                <svg width="15" height="15"><use href="#svg-search"/></svg>
                Поиск
            </button>
        </label>
    </form>
    <ul ref="regionList">
        <li v-for="(item, index) in city" :key="index">
            <a href="javascript:void(0)" @click.prevent="setCity(item['~CODE'], item['HREF'])"><span>{{ item.NAME }}</span></a>
        </li>
    </ul>
</b-modal>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            city: []
        }
    },
    methods: {
        regionFilter() {
            let input = this.$refs.regionInput;
            let inputVal = input.value.toLowerCase();
            let list = this.$refs.regionList;
            let li = list.querySelectorAll('li');

            for (let i = 0; i < li.length; i++) {
                let a = li[i].querySelector("a");
                let txtValue = a.textContent || a.innerText;
                if (txtValue.toLowerCase().indexOf(inputVal) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        },
        loadRegion() {
            this.$axios.$get(`api/v1/regions/`).then( response => {
                this.city = response.items;
                this.$store.commit('user/setCity', response.name)
            });
            this.$axios.$get(`api/v1/regions/set/?site_id=s1&action=get-php-coords`).then( response => {
                var lat = response.lat, lon = response.lon
                this.$axios.$get(`api/v1/regions/set/?latitude=${lat}&longitude=${lon}&site_id=s1&action=get-closest-region`).then( response => {
                    var code=response.region_code;
                    this.$axios.$get(`api/v1/regions/set/?site_id=s1&action=prepare-for-redirect-by-region-code&code=${code}`).then( response => {
                        if (response.redirect)
                        {
                            var domen = response.domen
                            this.$axios.$get(`api/v1/regions/set/?site_id=s1&action=set-cookie&cookie=${code}`).then( response => {
                                if (response.success && response.reload)
                                {
                                    location.href = domen;
                                }
                            });
                        }
                    });
                });
            });
        },
        setCity(code, href) {
            this.$axios.$get(`api/v1/regions/set/?site_id=s1&action=set-cookie&cookie=${code}`).then( response => {
                if (response.success && response.reload)
                {
                    location.href = href;
                }
            });
        }
    },
    computed: {
        ...mapGetters({
            sessid: 'order/getSessid'
        }),
    },
    mounted() {
        this.loadRegion()
    }
}
</script>
