<template>
<div>
    <b-modal class="header-menu hidden-desktop" id="header-menu" hide-header hide-footer>
        <div class="header-menu__top">
            <nuxt-link class="header-menu__logo" to="/" exact>
                <svg width="163" height="29"><use href="#svg-logo"/></svg>
                Главная
            </nuxt-link>
            <p
                class="header-menu__delivery-btn"
                @click="$bvModal.hide('header-menu'); $bvModal.show('delivery-region')"
            >
                Ваш регоин доставки: <span>Санкт-Петербург</span>
            </p>
        </div>
        <button
            v-if="!isLogged"
            class="header-menu__auth" @click="$bvModal.hide('header-menu');
            $bvModal.show('auth-modal')"
        >
            Вход / Регистрация
        </button>
        <button 
            v-for="(section, index) in sections" :key="index"
            class="header-menu__btn" 
            @click="indexCategories = index; $bvModal.hide('header-menu'); $bvModal.show('header-category')"
        >
                {{section.NAME}}
        </button>
        <div class="header-menu__features">
            <nuxt-link to="#0">Быстрая доставка</nuxt-link>
            <nuxt-link to="#0">Гарантия лучшей цены</nuxt-link>
            <nuxt-link to="#0">Изготовление очков</nuxt-link>
            <nuxt-link to="#0">Оригинальная продукция</nuxt-link>
        </div>
        <p class="header-menu__info">
            <svg width="15" height="15" fill="#4a4a4a"><use href="#svg-mobile"/></svg>
            8 (800) 444-34-88
        </p>
        <p class="header-menu__info">
            <svg width="15" height="15" fill="#4a4a4a"><use href="#svg-mobile"/></svg>
            8 (499) 391-19-41
        </p>
        <p class="header-menu__info">
            <svg width="10" height="10" fill="#4a4a4a" style="left: 3px;"><use href="#svg-clock"/></svg>
            Пн - Сб: с 10:00 до 20:00
        </p>
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
            <li v-for="(category, key) in section(indexCategories).SECTIONS" :key="key"><nuxt-link :to="category.UF_LINK">{{category.UF_NAME}}</nuxt-link></li>
        </ul>
        <ul class="header-category__list" v-if="!showCategories">
            <li v-for="(brand, key) in section(indexCategories).BRANDS" :key="key"><nuxt-link :to="brand.UF_LINK">{{brand.UF_NAME}}</nuxt-link></li>
            <li class="header-category__all"><nuxt-link to="#0">... смотреть все бренды</nuxt-link></li>
        </ul>
    </b-modal>
</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['isLogged'],
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
