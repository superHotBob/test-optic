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
            <form @submit.prevent="submitRequest"
              method="POST"
            >
              <input type="hidden" name="WEB_FORM_ID" value="1">
              <div class="space-flex">
                <div>
                  <p>Имя:</p>
                  <input type="text" v-model="request.name" class="large-input" placeholder="Ваше имя">
                </div>
                <div>
                  <p>Фамилия:</p>
                  <input
                    type="text"
                    v-model="request.last_name"
                    class="large-input"
                    placeholder="Ваша фамилия"
                  >
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>E-mail:</p>
                  <input type="text" v-model="request.email" class="large-input" placeholder="E-mail">
                </div>
                <div>
                  <p>Телефон:</p>
                  <input type="text" v-model="request.phone" class="large-input" placeholder="Телефон">
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>Ссылка на товар в другом магазине:</p>
                  <input
                    type="text"
                    v-model="request.link1"
                    class="large-input"
                    placeholder="Ссылка на товар в другом магазине"
                  >
                </div>
                <div>
                  <p>Ссылка на товар в нашем магазине:</p>
                  <input
                    type="text"
                    v-model="request.link2"
                    class="large-input"
                    placeholder="Ссылка на товар в нашем магазине"
                  >
                </div>
              </div>
              <p>Поле для сообщения:</p>
              <textarea v-model="request.msg" placeholder="Поле для сообщения"></textarea>
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
            <form @submit.prevent="submitRequest"
            >
              <div class="space-flex">
                <div>
                  <p>Имя:</p>
                  <input type="text" v-model="request.name" class="large-input" placeholder="Ваше имя">
                </div>
                <div>
                  <p>Фамилия:</p>
                  <input
                    type="text"
                    v-model="request.last_name"
                    class="large-input"
                    placeholder="Ваша фамилия"
                  >
                </div>
              </div>
              <div class="space-flex">
                <div>
                  <p>E-mail:</p>
                  <input type="text" v-model="request.email" class="small-input" placeholder="E-mail">
                </div>
                <div>
                  <p>Телефон:</p>
                  <input type="text" v-model="request.phone" class="small-input" placeholder="Телефон">
                </div>
                <div>
                  <p>Номер заказа:</p>
                  <input
                    type="text"
                    v-model="request.order"
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
                    v-model="request.link1"
                    class="large-input"
                    placeholder="Ссылка на товар в другом магазине"
                  >
                </div>
                <div>
                  <p>Ссылка на товар в нашем магазине:</p>
                  <input
                    type="text"
                    v-model="request.link2"
                    class="large-input"
                    placeholder="Ссылка на товар в нашем магазине"
                  >
                </div>
              </div>
              <p>Поле для сообщения:</p>
              <textarea v-model="request.msg" placeholder="Поле для сообщения"></textarea>
              <input type="submit" name="web_form_submit" value="Отправить заявку ">
            </form>
          </div>
        </div>
      </div>
  
      <b-modal class="call-request" id="call-request-price" hide-header hide-footer>
        <div class="modal-wrap">
            <div class="call-request__ok" v-if="callRequestOk">
                <p>Ваша заявка принята.</p>
                <p>Наш менеджер перезвонит вам <br> в ближайшие 20 минут.</p>
            </div>
        </div>
      </b-modal>
    </div>
  
</template>
<script>

import { mapGetters } from 'vuex'
import qs from 'qs'

export default {
    data () {
      return {
          active: true,
          show:false,
          callRequestOk:false,
          request: {
            name:'',
            last_name:'',
            email: '',
            phone:'',
            order:'',
            link1:'',
            link2:'',
            msg:''
          }
      }
    
    },

    methods: {
      submitRequest() {
        var params = {
            'WEB_FORM_ID':'2',
            'sessid':this.getSessid,
            'form_text_3':this.request.name,
            'form_text_4':this.request.last_name,
            'form_text_5':this.request.email,
            'form_text_6':this.request.phone,
            'form_text_7':this.request.order,
            'form_text_8':this.request.link1,
            'form_text_9':this.request.link2,
            'form_text_10':this.request.msg,
            'web_form_submit':'Y'
        }

        this.$axios.post('/api/v1/forms/', qs.stringify(params)).then( response => {
            if (response.data.FORM_NOTE) {
                this.callRequestOk = true;
                this.$bvModal.show('call-request-price');
            }
        });
      },
    },
    computed: {
      ...mapGetters({
        getSessid: 'order/getSessid',
      })
    },
    mounted(){
      this.$root.$on("show",(trigger)=>{
        console.log(1)
        this.show = trigger;
        
      })
      
    }

    
}
</script>