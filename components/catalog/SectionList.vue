<template>
  <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 1}">
    <nuxt-link tag="div"
      :to="{ name: 'catalog-section', params: { section: arSection.CODE }}" 
      class="item-mansory" v-for="arSection in arResult.SECTIONS" :key="arSection.ID"
    >
      <img v-if="arSection.PICTURE" :src="'http://gerbarium.proj/' + arSection.PICTURE.SRC"/>
      <nuxt-link :to="{ name: 'catalog-section', params: { section: arSection.CODE }}">{{arSection.NAME}}</nuxt-link>
    </nuxt-link>
  </masonry>
</template>

<script>
export default {
    name: 'SectionElements',
    props: {
      arParams: Object,
      arResult: Object,
    }
}
</script>

<style>
  .item-mansory {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .item-mansory:hover img {
    transform: scale(1.25);
  }
  .item-mansory a {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 24px;
    font-weight: 300;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    z-index: 2;
  }
  .item-mansory img {
    width: 100%;
    transition: .4s ease;
  }
  .item-mansory:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(56, 56, 56, 0.4);
    z-index: 1;
  }
</style>
