<template>
    <div>
        <div class="bestprice-all salon">
          <p
            class="bestprice-all-title"
          >Как воспользоваться "Гарантией лучшей цены" в розничных салонах?</p>
          <div class="tabs-two">
            <div class="bestprice-nav tabs-btns-bestprice">
              <div class="bestprice-nav-btn tabs-btn-bestprice"
                @click="active=true"
                :class="{ active:active }"
              >
                <p>До покупки</p>
              </div>
              <div class="bestprice-nav-btn tabs-btn-bestprice"
                @click="active=false"
                :class="{ active:!active }"
              >
                <p>После покупки</p>
              </div>
            </div>
            <div class="tabs-blocks">
              <div class="bestprice-block tabs-block"
                v-if="active" :class='{ active: active}'
              >
                <div class="center-flex">
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Сообщите</p>
                    <p>О низкой цене конкурента или покажите в любом виде ее подтверждение</p>
                  </div>
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Мы вместе убедимся,</p>
                    <p>Что такой же товар действительно стоит дешевле</p>
                  </div>
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Мы снизим цену</p>
                    <p>До цены конкурента и подарим 10% от разницы в цене</p>
                  </div>
                </div>
                <div class="bestprice-button"
                  @click="showForm"
                >
                  <p>Оставить заявку</p>
                </div>
              </div>
              <div class="bestprice-block tabs-block"
                v-if="!active"
                :class='{ active:!active }'
              >
                <div class="center-flex">
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Сообщите</p>
                    <p>О низкой цене конкурента или покажите в любом виде ее подтверждение</p>
                  </div>
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Мы вместе убедимся,</p>
                    <p>Что такой же товар действительно стоит дешевле</p>
                  </div>
                  <div class="bestprice_flex_item">
                    <div class="bestprice_flex_img"></div>
                    <p>Мы вернем 110%</p>
                    <p>Разницы в цене на бонусную карту</p>
                  </div>
                </div>
                <div class="bestprice-button" 
                  @click="showForm"
                >
                  <p >Оставить заявку</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>

export default {
    data () {
      return {
          cheaperFormActive: false,
          active:true,
          
      }
    },
    methods:{
      showForm(){
        console.log(2)
        this.cheaperFormActive=!this.cheaperFormActive
        this.$root.$emit("show" , this.cheaperFormActive)
      },
     
    }
}
</script>