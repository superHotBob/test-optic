<template>
<div class="app-container">
    <header class="page-header">
        <div class="page-header__top hidden-mobile">
            <div class="main-container">
                <div class="page-header__region" @click="regionModal = !regionModal">
                    <p v-b-modal.delivery-region>Ваш регион доставки: Санкт-Петербург</p>
                </div>
                <b-modal id="delivery-region" title="Overflowing Content" style="color: black;" hide-footer>
                    <p class="my-4" v-for="i in 4" :key="i">
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>
                </b-modal>
                <div class="page-header__features" :class="{'hidden': featuresHidden}">
                    <div class="header-feature">
                        <a href="#0">Быстрая доставка</a>
                        <div class="header-feature__popup">
                            <p>Мгновенно доставим любой товар в любую точку России.</p>
                            <a href="">Подробнее ...</a>
                        </div>
                    </div>
                    <div class="header-feature">
                        <a href="#0">Гарантия лучшей цены</a>
                        <div class="header-feature__popup">
                            <p>Гарантируем лучшие цены на все товары. Мы заботимся о Вас и хотим, чтобы вы приобретали хорошие товары по лучшим ценам.</p>
                            <a href="">Подробнее ...</a>
                        </div>
                    </div>
                    <div class="header-feature">
                        <a href="#0">Изготовление очков</a>
                        <div class="header-feature__popup">
                            <p>Профессионально установим линзы любой сложности в любую оправу.</p>
                            <a href="">Подробнее ...</a>
                        </div>
                    </div>
                    <div class="header-feature">
                        <a href="#0">Оригинальная продукция</a>
                        <div class="header-feature__popup">
                            <p>Мы занимаемся только оригинальной продукцией. С радостью подтвердим все товары сертификатами производителей.</p>
                            <a href="">Подробнее ...</a>
                        </div>
                    </div>
                </div>
                <div class="page-header__stat-counter"></div>
                <div class="page-header__features-toggle" @click="featuresHidden =! featuresHidden">Показать</div>
            </div>
        </div>
        <div class="page-header__tels main-container hidden-mobile">
            <p>Контактные номера: <b>8 (499) 391-19-41, 8 (800) 444-34-88</b> (беслатный звонок)</p>
            <p>Режим работы Пн-Сб: <b>с 10:00 до 20:00</b></p>
        </div>
        <div class="page-header__main main-container">
            <a href="/">
                <svg width="269" height="48"><use href="#svg-logo"/></svg>
            </a>
            <form class="header__search" aria-label="Поиск">
                <label class="textfield light">
                    <input type="text" placeholder="Поиск...">
                    <button class="textfield__icon" type="button"><svg width="15" height="15"><use href="#svg-search"/></svg>Поиск</button>
                </label>
            </form>
            <button class="header__call-request" v-b-modal.call-request>
                <svg width="25" height="25" fill="#fff" stroke="#000"><use href="#svg-phone" stroke-width="25px"/></svg>
                Обратный звонок
            </button>
            <b-modal class="call-request" id="call-request" hide-footer hide-header>
                <div class="modal-wrap">
                    <button class="modal-close" @click="$bvModal.hide('call-request')"></button>
                    <div class="call-request__text">
                        <h3>Обратный звонок</h3>
                        <p>Вышлите нам свой номер телефона, <br> и наш менеджер перезвонит вам <br> в близжайшие 20 минут.</p>
                    </div>
                    <form class="call-request__form" aria-label="Заказать обратный звонок">
                        <label class="textfield">
                            <span>Ваше имя</span>
                            <input type="text">
                        </label>
                        <label class="textfield">
                            <span>Ваш телефон</span>
                            <input type="text">
                        </label>
                        <button class="call-request__submit button black" type="submit">Заказать звонок</button>
                    </form>
                </div>
            </b-modal>
            <no-ssr>
                <swiper>
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide>
                    <swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide>
                    <swiper-slide>Slide 9</swiper-slide>
                    <swiper-slide>Slide 10</swiper-slide>
                </swiper>
            </no-ssr>

            <div class="header__basket">
                <button>
                    <svg style="margin-left: 20px;" width="20" height="27"><use href="#svg-bag"/></svg>
                    Корзина
                </button>
                <p>5 шт. - <b>10 589.45 руб</b></p>
            </div>
        </div>
        <div class="page-header__bottom hidden-mobile">
            <div class="main-container">

            </div>
        </div>
        <button type="button" class="btn btn-primary">Primary</button>
    </header>
    <main>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>

        <!-- <log-out/>
            <login-form/>
            <basket/>
            <order/>
            <div>
                <nuxt-link active-class="active" to="/" exact>Главная</nuxt-link>
            </div>
            <div>
                <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'frames' }}">Оправы</nuxt-link>
                <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'rims' }}">Линзы для очков</nuxt-link>
            </div> -->
        <nuxt/>
    </main>
    <footer class="page-footer">
        <h2>Footer</h2>
    </footer>
    <div style="display: none;">
        <svg id="svg-logo" fill="#2b2a29"
            xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 6926 1236" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path class="fil0" d="M0 103l0 835 194 0 0 -414 384 0 0 414 194 0 0 -936 -194 0 0 350 -384 0 0 -350 -98 0c-54,0 -96,47 -96,100zm1185 96c-220,0 -330,125 -330,379 0,251 110,377 330,377 220,0 332,-127 332,-377 0,-253 -111,-379 -332,-379zm0 161c94,0 140,70 140,212 -1,145 -48,219 -142,219 -94,0 -142,-72 -143,-213 0,-145 48,-217 145,-217zm729 0c81,0 122,37 127,113l0 465 184 0 0 -462c1,-76 43,-113 124,-113 81,0 122,37 127,113l0 374c0,58 30,87 91,91l95 0 0 -428c1,-208 -102,-311 -310,-311 -94,0 -165,19 -217,59 -52,-41 -124,-62 -217,-62 -208,0 -312,103 -312,311l0 428 186 0 0 -465c1,-76 43,-113 124,-113zm1496 355l-135 0c-25,0 -45,8 -62,26 -36,34 -76,52 -118,52 -89,0 -138,-56 -145,-168l471 0c14,-285 -95,-427 -326,-427 -222,1 -333,125 -333,373 0,248 110,376 330,383 179,0 278,-85 318,-239zm-318 -366c78,0 124,50 135,146l-274 0c14,-96 61,-146 139,-146z"/>
            <path class="fil0" d="M4293 167c175,0 257,132 257,317 0,189 -83,321 -257,321 -175,0 -256,-138 -256,-321 0,-182 81,-317 256,-317zm0 798c285,0 449,-194 449,-482 0,-284 -169,-483 -449,-483 -278,0 -447,197 -447,483 0,286 162,482 447,482zm724 180c0,61 -30,91 -91,91l-92 0 0 -696c10,-217 122,-325 341,-325 226,0 339,122 339,367 0,248 -96,376 -290,383 -91,0 -160,-37 -206,-113l0 293zm156 -344c99,0 150,-70 154,-211 0,-147 -52,-220 -157,-220 -105,0 -154,73 -153,220 6,140 56,211 156,211zm720 -538l0 -40 -110 0 0 -116c0,-48 -40,-92 -88,-92l-95 0 0 796c-1,81 32,124 100,131 69,7 134,7 193,1l0 -139 -56 0c-36,0 -54,-17 -54,-47l0 -403 19 0c51,0 91,-39 91,-91zm105 -248l0 143 183 0 0 -54c1,-59 -28,-89 -88,-89l-95 0zm0 208l0 728 183 0 0 -640c0,-59 -29,-88 -88,-88l-95 0zm929 505l-138 0c-23,0 -44,8 -62,26 -30,34 -67,52 -110,52 -102,1 -153,-72 -153,-216 0,-145 48,-217 145,-217 58,0 96,26 118,76l200 0c-32,-158 -136,-237 -312,-237 -224,4 -336,129 -336,379 6,251 118,377 339,377 169,4 277,-91 310,-239z"/>
        </svg>
        <svg id="svg-search" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 451 451" xml:space="preserve">
            <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"/>
        </svg>
        <svg id="svg-phone" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-15 -15 378.077 378.077" xml:space="preserve">
            <path d="M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076 c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257 c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02 C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029 C350.631,303.527,350.95,285.795,340.273,275.083z"/>
        </svg>
        <svg id="svg-bag" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" viewBox="0 0 19.256 25.249">
            <path d="M18.008 5.242h-2.751c-.009-6.989-10.99-6.989-10.999 0H1.25L0 25.249h19.256L18.008 5.242zm-4.751 0H6.258c.009-4.444 6.99-4.444 6.999 0zm-11 18.008l1-16h13l1 16h-15z"></path>
        </svg>


    </div>
</div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue'
import LogOut from '~/components/user/ButtonLogout.vue'
import LoginForm from '~/components/user/LoginForm.vue'
import Order from '~/components/order/Order.vue'


export default {
    data() {
        return {
            featuresHidden: true
        }
    },
    components: {
        Basket,
        LoginForm,
        LogOut,
        Order
    },
    computed: {
    },
}
</script>

<style lang="scss">
.app-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.modal-region {
    padding: 20px;
    color: #000;
    background-color: #fff;
}
</style>
