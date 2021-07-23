<template>
<b-modal class="buyoneclick" id="buyclick" hide-header hide-footer>
    <div class="modal-wrap" v-if="item">
        <button class="modal-close" @click="$bvModal.hide('buyclick')">
            <span class="modal-close__icon"></span>
        </button>
        <div class="fast-order-popup-block">
            <h4>Купить в один клик</h4>
            <p>Оставьте краткую информаци о вас, менеджер с вами свяжется и уточнит детали о доставке и оплате вашего заказа</p>
        </div>
        <div v-if="result.success == 'Y'" class="alert alert-success">
            {{ result.message }}
        </div>
        <div v-if="result.success == 'N'" class="alert alert-danger">
            <span v-for="(error, index) in result.error" :key="index">
                {{ error }}
            </span>
        </div>
        <form class="buyform" @submit.prevent="submit($event)">
            <div class="form-group">
                <label fot="name">Ваше имя</label>
                <input class="form-control" name="name" id="name" required v-model="buy1click.name" type="text">
            </div>
            <div class="form-group">
                <label for="phone">Ваш телефон</label>           
                <input class="form-control" required name="phone" id="phone" placeholder="+7(___)___-__-__" v-mask="'+7(###)###-##-##'" v-model="buy1click.phone" type="tel"> 
            </div>
            <div class="form-group">
                <label for="message">Текст сообщения</label>
                <textarea class="form-control" name="text" id="message" v-model="buy1click.message" rows="5"></textarea>
            </div>
            <div class="form-group" style="flex-direction: row; align-items: center; flex-wrap: wrap;">
                <input
                    v-model="rule"
                    name="rule"
                    type="checkbox"
                    checked
                    value="1"
                    style="margin-right: 10px;"
                    >
                <span>Я даю согласие на обработку персональных данных</span>
                <span v-show="ruleError" class="error" style="width: 100%;color: red;padding: 10px 0;display: block;">Пожалуйста, подтвердите обработку персональных данных</span>
            </div>
            <div class="form-group">
                <button type="submit" class="button">Отправить</button>
            </div>
        </form>
    </div>
</b-modal>
</template>

<script>

import { mapGetters } from 'vuex'
import qs from 'qs'

export default {
    data() {
        return {
            item:null,
            buy1click: {
                name: '',
                phone:'',
                message:''
            },
            rule: [],
            ruleError: false,
            result: false
        }
    },
    methods: {
        submit($event) {
            if(this.rule == 1) 
                this.ruleError = false
            else
                this.ruleError = true

            if(this.ruleError) return

            var data = {
                'action':'buy1click',
                'cart':'N',
                'id':this.item.ID,
                'offer_id':this.item.CURRENT.ID,
                'siteid':'s1',
                'langid':'ru',
                'name':this.buy1click.name,
                'phone':this.buy1click.phone,
                'text':this.buy1click.message,
                'sessid':this.sessid
            }
            
            this.$axios.$post('/api/v1/buy1click/', qs.stringify(data)).then( result => {
                this.result = result;
            })
        },  
    },
    computed: {
        ...mapGetters({
            sessid: 'order/getSessid'
        }),
    },
    mounted() {
        this.$root.$on('buy1click', result => {
            this.item = result.item;
        });
    }
}
</script>

<style lang="scss">
.buyoneclick {
    .modal-wrap {
        padding: 0 20px;
        .fast-order-popup-block {
            text-align: center;
            h2 {
                font-weight: bold;
            }
        }
        .buyform {
            text-align: left;
        }
    }
}

</style>

