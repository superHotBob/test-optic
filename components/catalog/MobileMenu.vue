<template>
    <div>
        <b-modal class="header-menu hidden-desktop" id="header-menu" hide-header hide-footer>
            <div class="header-menu__top">
                <nuxt-link class="header-menu__logo" to="/" exact>
                    <svg width="163" height="29"><use href="#svg-logo"/></svg>
                    Главная
                </nuxt-link>
                <p class="header-menu__delivery-btn" @click="$bvModal.hide('header-menu'); $bvModal.show('delivery-region')">Ваш регоин доставки: <span>Санкт-Петербург</span></p>
            </div>
            <button class="header-menu__auth">Вход / Регистрация</button>
            <button 
                v-for="(section, index) in sections" :key="index"
                class="header-menu__btn" 
                @click="indexCategories = index; $bvModal.hide('header-menu'); $bvModal.show('header-category')"
            >
                    {{section.NAME}}
            </button>
        </b-modal>
        <b-modal class="header-category hidden-desktop" id="header-category" hide-header hide-footer>
            <div class="header-category__top">
                <button class="modal-back black hidden-desktop" @click="$bvModal.hide('header-category'); $bvModal.show('header-menu')"></button>
                <p>
                    <span :class="{'active': showCategories}" @click="showCategories = !showCategories">Категории</span>
                    /
                    <span :class="{'active': !showCategories}" @click="showCategories = !showCategories">Бренды</span>
                </p>
            </div>
            <ul class="header-category__list" v-if="showCategories">
                <li v-for="(category, key) in section(indexCategories).SECTIONS" :key="key"><nuxt-link to="#0">{{category.UF_NAME}}</nuxt-link></li>
                <li class="header-category__all"><nuxt-link to="#0">... смотреть все категории</nuxt-link></li>
            </ul>
            <ul class="header-category__list" v-if="!showCategories">
                <li v-for="(brand, key) in section(indexCategories).BRANDS" :key="key"><nuxt-link to="#0">{{brand.UF_NAME}}</nuxt-link></li>
                <li class="header-category__all"><nuxt-link to="#0">... смотреть все бренды</nuxt-link></li>
            </ul>
        </b-modal>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            showCategories: true,
            indexCategories: 0
        }
    },
    computed: {
        ...mapGetters({
            section: 'catalog/getSectionsIndex',
            sections: 'catalog/getSections',
        }),
    },
}
</script>
