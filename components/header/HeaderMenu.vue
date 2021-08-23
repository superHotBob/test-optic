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
                Ваш регоин доставки: <span v-if="city">{{city}}</span>
            </p>
            <a target="_blank" rel="nofollow" href="https://clck.yandex.ru/redir/dtype=stred/pid=47/cid=2508/*https://market.yandex.ru/shop/352074/reviews" class="stat-counter" style="display: block; margin: 9px 0 0 0;"></a>
        </div>
        <button
            v-if="!isLogged"
            class="header-menu__auth" @click="$bvModal.hide('header-menu');
            $bvModal.show('auth-modal')"
        >
            Вход / Регистрация
        </button>
        <button v-for="(section, index) in sections" :key="index" class="header-menu__btn" >
            <nuxt-link
                @click.native="$bvModal.hide('header-menu');"
                :to="{ name: 'section', params: {section: section.CODE }}"
            >
                {{section.NAME}}

            </nuxt-link>
            <span
                class="arrow"
                @click="indexCategories = index; $bvModal.hide('header-menu'); $bvModal.show('header-category')"
            ></span>
        </button>
        <div class="header-menu__features">
            <nuxt-link @click.native="$bvModal.hide('header-menu');" to="/company/delivery">Быстрая доставка</nuxt-link>
            <nuxt-link @click.native="$bvModal.hide('header-menu');" to="/company/bestprice">Гарантия лучшей цены</nuxt-link>
            <nuxt-link @click.native="$bvModal.hide('header-menu');" to="/company/glasses_manufacturer">Изготовление очков</nuxt-link>
            <nuxt-link @click.native="$bvModal.hide('header-menu');" to="/company/original">Оригинальная продукция</nuxt-link>
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
        <button class="modal-back black hidden-desktop" @click="$bvModal.hide('header-category'); $bvModal.show('header-menu')"></button>
        <b-tabs pills>
            <template v-for="(tab, index) in section(indexCategories).TABS">
                <b-tab :key="index" v-if="tab.LINK.length > 0" :title="tab.UF_NAME">
                    <ul class="header-category__list">
                        <li v-for="(link, key) in tab.LINK" :key="key">
                            <nuxt-link :to="link.UF_LINK" @click.native="$bvModal.hide('header-category')">yrtyr{{link.UF_NAME}}</nuxt-link>
                        </li>
                    </ul>
                </b-tab>
            </template>
        </b-tabs>
    </b-modal>
</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: ['isLogged'],
    data() {
        return {
            indexCategories: 0
        }
    },
    computed: {
        ...mapGetters({
            section: 'catalog/getSectionsIndex',
            sections: 'catalog/getSections',
            city: 'user/getCity'
        }),
    },
}
</script>
