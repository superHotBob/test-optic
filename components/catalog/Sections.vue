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
          <b-tabs pills vertical>
            <template v-for="(tab, index) in section.TABS">
              <b-tab :key="index" v-if="tab.LINK.length > 0">
                <template slot="title">
                 sdfsdf {{ tab.UF_NAME }}
                  <span class="arrow"></span>
                </template>
                <div class="col">
                  <ul class="tab-sections">
                    <li v-for="(link, indexLink) in tab.LINK" :key="indexLink">
                      <nuxt-link :to="link.UF_LINK">{{ link.UF_NAME }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </b-tab>
            </template>
          </b-tabs>
         </div>
          <nuxt-link class="header-categories__img" :to="{ name: 'section', params: {section: section.CODE }}">
              <img v-if="section.PICTURE" :src="section.PICTURE" alt="{section.NAME}">
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
    }
}
</script>
