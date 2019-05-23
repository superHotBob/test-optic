<template>
<div class="bestprice main-container custom-page">
  <div class="advantages-block">
    <p class="advantages-block_title">больше не нужно искать лучшие цены:</p>
    <div class="center-flex">
      <div class="advantage">
        <div class="advantage_img"></div>
        <p>Мы ежедневно мониторим цены крупнейших оптик. Сравниваем цены и предлагаем Вам лучшие!</p>
      </div>
      <div class="advantage">
        <div class="advantage_img"></div>
        <p>Если вы найдете товар дешевле, снизим цену и подарим 10% от разницы в цене</p>
      </div>
      <div class="advantage">
        <div class="advantage_img"></div>
        <p>Если в течение 1 дня после оформления заказа вы нашли цену ниже, то мы вернем 110% разницы</p>
      </div>
    </div>
  </div>
  <guarantee-optic></guarantee-optic>
  <guarantee-salon></guarantee-salon>
  <cheaper-form></cheaper-form>
  <br>
</div>
</template>

<script>
import GuaranteeOptic from '~/components/bestprice/guarantee/GuaranteeOptic.vue'
import GuaranteeSalon from '~/components/bestprice/guarantee/GuaranteeSalon.vue'
import CheaperForm from '~/components/bestprice/guarantee/CheaperForm.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
        GuaranteeOptic,
        GuaranteeSalon,
        CheaperForm,
  },
};
</script>
