<template>
<div class="card-tabs">
    <div class="card-tabs__slider" v-swiper:card__tabs="tabsOptions">
        <div class="swiper-wrapper">
            <p class="swiper-slide"
                :class="{'active': tabs[1].show == true}"
                v-if="tabs[1].has"
                @click="toggleTab(1)"
            >Описание</p>
            <p class="swiper-slide"
                :class="{'active': tabs[2].show == true}"
                v-if="tabs[2].has"
                @click="toggleTab(2)"
            >Характеристики</p>
            <p class="swiper-slide"
                :class="{'active': tabs[3].show == true}"
                v-if="tabs[3].has && properties.multitext"
                @click="toggleTab(3)"
            >Мультипокрытие</p>
            <p class="swiper-slide"
                :class="{'active': tabs[4].show == true}"
                v-if="tabs[4].has && properties.opportunities"
                @click="toggleTab(4)"
            >Доп. возможности</p>
            <p class="swiper-slide"
                :class="{'active': tabs[5].show == true}"
                v-if="tabs[5].has"
                @click="toggleTab(5)"
            >Задать вопрос</p>
            <p class="swiper-slide"
                :class="{'active': tabs[6].show == true}"
                v-if="tabs[6].has"
                @click="toggleTab(6)"
            >Отзывы</p>
        </div>
    </div>
    <div class="card-tabs__tabs">
        <div class="card-tabs__tab" v-if="tabs[1].has" v-show="tabs[1].show" v-html="description"></div>
        <div class="card-tabs__tab" v-if="tabs[2].has" v-show="tabs[2].show">
            <ul class="card-tabs__attributes">
                <template v-for="(prop, index) in properties">
                <li v-if="!prop.VALUE.TEXT" :key="index">
                    <span class="grey">{{prop.NAME}}:</span>
                    <span>{{prop.VALUE}}</span>
                </li>
                </template>
            </ul>
        </div>
        <div class="card-tabs__tab" v-if="tabs[3].has && properties.multitext" v-show="tabs[3].show" v-html="properties.multitext.VALUE.TEXT"></div>
        <div class="card-tabs__tab" v-if="tabs[4].has && properties.opportunities" v-show="tabs[4].show" v-html="properties.opportunities.VALUE.TEXT"></div>
        <div class="card-tabs__tab no-mob-padding" v-if="tabs[5].has" v-show="tabs[5].show">
            <form @submit.prevent="validateForm('form-question')" data-vv-scope="form-question" ref="form-question">
                <label class="textfield half">
                    <input name="name" type="text" placeholder="Ваше имя">
                </label>
                <label class="textfield half">
                    <input v-validate="'required|email'" name="email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                    <span v-show="errors.has('form-question.email')" class="error">{{ errors.first('form-question.email') }}</span>
                </label>
                <label class="textfield">
                    <textarea name="textarea" cols="30" rows="10" placeholder="Текст вопроса" required></textarea>
                </label>
                <button class="button black submit" type="submit">Отправить</button>
            </form>
        </div>
        <div class="card-tabs__tab no-mob-padding" v-if="tabs[6].has" v-show="tabs[6].show">
            <p v-if="!isLogged">
                Чтобы оставить комментарий,
                <button class="btn-simple" @click="$bvModal.show('auth-modal')">авторизируйтесь</button>.
            </p>
            <form v-else @submit.prevent="validateForm('form-feedback')" data-vv-scope="form-feedback" ref="form-feedback">
                <label class="textfield half">
                    <input name="name" type="text" placeholder="Ваше имя">
                </label>
                <label class="textfield half">
                    <input v-validate="'required|email'" name="email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                    <span v-show="errors.has('form-feedback.email')" class="error">{{ errors.first('form-feedback.email') }}</span>
                </label>
                <label class="textfield">
                    <textarea name="textarea" cols="30" rows="10" placeholder="Текст комментария" required></textarea>
                </label>
                <button class="button black submit" type="submit">Отправить</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    props: ['properties','description'],
    data() {
        return {
            tabs: {
                1: {
                    show: true,
                    has: true,
                },
                2: {
                    show: false,
                    has: true,
                },
                3: {
                    show: false,
                    has: true,
                },
                4: {
                    show: false,
                    has: true,
                },
                5: {
                    show: false,
                    has: true,
                },
                6: {
                    show: false,
                    has: true,
                },
            },
            tabsOptions: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true,
            },
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged',
        })
    },
    methods: {
        toggleTab(tabNum) {

            for (let [key, tab] in this.tabs) {
                if (tabNum == key) {
                    this.tabs[key].show = true
                } else {
                    this.tabs[key].show = false
                }
            }
        },
        openComments() {
            for (let key in this.tabs) {
                this.tabs[key].show = false
            }
            this.tabs[6].show = true
        },
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    this.$refs[scope].submit()
                }
            });
        },
    },
    mounted() {
        this.$root.$on('addFeedback', result => { 
            this.openComments();
        })
    },
}
</script>
