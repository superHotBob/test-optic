<template>
  <div class="header-categories">
    <template v-for="(section, index) in sections">
      <nuxt-link 
        class="header-categories__button" 
        :to="{ name: 'section', params: {section: section.CODE }}" 
        :key="section.CODE"
      >
        {{section.NAME}}
      </nuxt-link>
      <div class="header-categories__popup" :key="index">
          <div class="header-categories__col">
              <p>Категории</p>
              <ul>
                  <li v-for="(category, index) in section['SECTIONS']" :key="index"><nuxt-link :to="category.UF_LINK">{{category.UF_NAME}}</nuxt-link></li>
                  
              </ul>
          </div>
          <div class="header-categories__col col2">
              <p>Бренды</p>
              <ul>
                  <li v-for="(brand, index) in section['BRANDS']" :key="index"><nuxt-link :to="brand.UF_LINK">{{brand.UF_NAME}}</nuxt-link></li>
                  <li><nuxt-link class="header-categories__view-all" to="/brands">... смотреть все бренды</nuxt-link></li>
              </ul>
          </div>
          <nuxt-link class="header-categories__img" :to="{ name: 'section', params: {section: section.CODE }}">
              <img v-if="section.PICTURE" :src="section.PICTURE" alt="">
              <p>{{section.NAME}}</p>
              <p>{{section.DESCRIPTION}}</p>
          </nuxt-link>
      </div>
    </template>
</div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  computed: {
        ...mapGetters({
            sections: 'catalog/getSections',
        }),
    },
}
</script>
