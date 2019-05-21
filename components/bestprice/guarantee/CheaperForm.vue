<template>
  
    <div class="cheaper-form" 
      v-if="show"
    >
      <div class="cheaper-img"></div>
      <div class="tabs-three">
        <div class="form-nav tabs-btns-bestprice">
          <p
            class="form-switch-button tabs-btn-bestprice"
            :class="{ active_style_line:active }"
            @click="active=true"
          >Планирую купить</p>/
          <p
            class="form-switch-button tabs-btn-bestprice"
            :class="{ active_style_line:!active }"
            @click="active=false"
          >Уже купил</p>
        </div>
        <div class="tabs-blocks">
          <div
            class="cheaper-inputs-two tabs-block"
            v-if="active"
            :class="{ active: active }"
          >
            <div class="form_result"></div>

            <p class="cheaper-form-title">Нашли этот товар дешевле?</p>
            <p
              class="cheaper-form-subtitle"
            >Пришлите нам ссылку на этот товар в другом магазине, и в течение четырех часов Вы получите SMS с уникальным промо-кодом. В случает отказа информация поступит на указанный Вами E-mail.</p>
            <form
              name="SIMPLE_FORM_1"
              action="/information/garantiya_luchshey_tseny/"
              method="POST"
              enctype="multipart/form-data"
            >
              <input
                type="hidden"
                name="sessid"
                id="sessid"
                value="a4b45fc200ea25da136fdf8a51381f71"
              >
              <input type="hidden" name="WEB_FORM_ID" value="1">
              <div class="space-flex">
                <div>
                  <p>Имя:</p>
                  <input type="text" name="form_text_2" class="large-input" placeholder="Ваше имя">
                </div>
                <div>
                  <p>Фамилия:</p>
                  <input
                    type="text"
                    name="form_text_1"
                    class="large-input"
                    placeholder="Ваша фамилия"
                  >
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>E-mail:</p>
                  <input type="text" name="form_email_3" class="large-input" placeholder="E-mail">
                </div>
                <div>
                  <p>Телефон:</p>
                  <input type="text" name="form_text_4" class="large-input" placeholder="Телефон">
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>Ссылка на товар в другом магазине:</p>
                  <input
                    type="text"
                    name="form_text_5"
                    class="large-input"
                    placeholder="Ссылка на товар в другом магазине"
                  >
                </div>
                <div>
                  <p>Ссылка на товар в нашем магазине:</p>
                  <input
                    type="text"
                    name="form_text_6"
                    class="large-input"
                    placeholder="Ссылка на товар в нашем магазине"
                  >
                </div>
              </div>
              <p>Поле для сообщения:</p>
              <textarea name="form_textarea_7" placeholder="Поле для сообщения"></textarea>
              <input type="submit" name="web_form_submit" value="Отправить заявку ">
            </form>
          </div>
          <div
            class="cheaper-inputs-one tabs-block"
            v-if="!active"
            :class="{active:!active}"
          >
            <div class="form_result"></div>

            <p class="cheaper-form-title">Нашли этот товар дешевле?</p>
            <p
              class="cheaper-form-subtitle"
            >Пришлите нам ссылку на этот товар в другом магазине, и в течение четырех часов Вы получите SMS с уникальным промо-кодом. В случает отказа информация поступит на указанный Вами E-mail.</p>
            <form
              name="SIMPLE_FORM_1"
              action="/information/garantiya_luchshey_tseny/"
              method="POST"
              enctype="multipart/form-data"
            >
              <input
                type="hidden"
                name="sessid"
                id="sessid_1"
                value="a4b45fc200ea25da136fdf8a51381f71"
              >
              <input type="hidden" name="WEB_FORM_ID" value="1">
              <div class="space-flex">
                <div>
                  <p>Имя:</p>
                  <input type="text" name="form_text_9" class="large-input" placeholder="Ваше имя">
                </div>
                <div>
                  <p>Фамилия:</p>
                  <input
                    type="text"
                    name="form_text_8"
                    class="large-input"
                    placeholder="Ваша фамилия"
                  >
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>E-mail:</p>
                  <input type="text" name="form_email_11" class="small-input" placeholder="E-mail">
                </div>
                <div>
                  <p>Телефон:</p>
                  <input type="text" name="form_text_12" class="small-input" placeholder="Телефон">
                </div>
                <div>
                  <p>Номер заказа:</p>
                  <input
                    type="text"
                    name="form_text_10"
                    class="very-small-input"
                    placeholder="Номер заказа"
                  >
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>Ссылка на товар в другом магазине:</p>
                  <input
                    type="text"
                    name="form_text_13"
                    class="large-input"
                    placeholder="Ссылка на товар в другом магазине"
                  >
                </div>
                <div>
                  <p>Ссылка на товар в нашем магазине:</p>
                  <input
                    type="text"
                    name="form_text_14"
                    class="large-input"
                    placeholder="Ссылка на товар в нашем магазине"
                  >
                </div>
              </div>
              <p>Поле для сообщения:</p>
              <textarea name="form_textarea_15" placeholder="Поле для сообщения"></textarea>
              <input type="submit" name="web_form_submit" value="Отправить заявку ">
            </form>
          </div>
        </div>
      </div>
    </div>
  
</template>
<script>

export default {
    data () {
      return {
          active: true,
          show:false,
      }
    
    },
    mounted(){
      this.$root.$on("show",(trigger)=>{
        console.log(1)
        this.show = trigger;
        
      })
      
    }

    
}
</script>