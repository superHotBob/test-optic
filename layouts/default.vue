<template>
<div class="app-container">
    <header class="page-header">
        <div class="page-header__top hidden-mobile">
            <div class="main-container">
                <div class="page-header__region">
                    <p v-b-modal.delivery-region>Ваш регион доставки: Санкт-Петербург</p>
                </div>
                <div class="page-header__features" :class="{'hidden': featuresHidden}">
                    <div class="header-feature">
                        <nuxt-link to="#0">Быстрая доставка</nuxt-link>
                        <div class="header-feature__popup">
                            <p>Мгновенно доставим любой товар в любую точку России.</p>
                            <nuxt-link to="#0">Подробнее ...</nuxt-link>
                        </div>
                    </div>
                    <div class="header-feature">
                        <nuxt-link to="#0">Гарантия лучшей цены</nuxt-link>
                        <div class="header-feature__popup">
                            <p>Гарантируем лучшие цены на все товары. Мы заботимся о Вас и хотим, чтобы вы приобретали хорошие товары по лучшим ценам.</p>
                            <nuxt-link to="#0">Подробнее ...</nuxt-link>
                        </div>
                    </div>
                    <div class="header-feature">
                        <nuxt-link to="#0">Изготовление очков</nuxt-link>
                        <div class="header-feature__popup">
                            <p>Профессионально установим линзы любой сложности в любую оправу.</p>
                            <nuxt-link to="#0">Подробнее ...</nuxt-link>
                        </div>
                    </div>
                    <div class="header-feature">
                        <nuxt-link to="#0">Оригинальная продукция</nuxt-link>
                        <div class="header-feature__popup">
                            <p>Мы занимаемся только оригинальной продукцией. С радостью подтвердим все товары сертификатами производителей.</p>
                            <nuxt-link to="#0">Подробнее ...</nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="page-header__stat-counter"></div>
                <button class="page-header__features-toggle" @click="featuresHidden =! featuresHidden" ref="featuresToggle">Показать</button>
            </div>
        </div>
        <div class="page-header__tels main-container hidden-mobile">
            <p>Контактные номера: <b>8 (499) 391-19-41, 8 (800) 444-34-88</b> (беслатный звонок)</p>
            <p>Режим работы Пн-Сб: <b>с 10:00 до 20:00</b></p>
        </div>
        <div class="page-header__main main-container">
            <button class="page-header__menu-btn hidden-desktop" v-b-modal.header-menu>Меню</button>

            <nuxt-link class="page-header__logo" to="/" exact>
                <svg width="269" height="48"><use href="#svg-logo"/></svg>
                Главная
            </nuxt-link>
            
            <search-form/>

            <button class="page-header__call-request btn-icon" v-b-modal.call-request>
                <svg width="25" height="25" fill="#000"><use href="#svg-phone"/></svg>
                Обратный звонок
            </button>

            <b-modal class="call-request" id="call-request" hide-header hide-footer>
                <div class="modal-wrap">
                    <button class="modal-close" @click="$bvModal.hide('call-request')"></button>
                    <div class="call-request__text" v-if="!callRequestOk">
                        <h3>Обратный звонок</h3>
                        <p>Вышлите нам свой номер телефона, <br> и наш менеджер перезвонит вам <br> в близжайшие 20 минут.</p>
                    </div>
                    <form class="call-request__form" aria-label="Заказать обратный звонок" v-if="!callRequestOk" @submit.prevent="callRequestOk = !callRequestOk">
                        <label class="textfield">
                            <span>Ваше имя</span>
                            <input name="name" type="text">
                        </label>
                        <label class="textfield">
                            <span>Ваш телефон</span>
                            <input name="phone" type="text">
                        </label>
                        <button class="call-request__submit button black" type="submit">Заказать звонок</button>
                    </form>
                    <div class="call-request__ok" v-if="callRequestOk">
                        <p>Ваша заявка принята.</p>
                        <p>Наш менеджер перезвонит вам <br> в ближайшие 20 минут.</p>
                    </div>
                </div>
            </b-modal>

            <basket-small :isLogged="isLogged" />
        </div>
        <div class="page-header__bottom hidden-mobile">
            <div class="main-container">
                <sections/>
                <div class="header-panel">
                    <p>
                        <nuxt-link to="#0">
                            <span>Сравнение</span>
                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link to="#0">
                            <span>Список желаемого</span>
                        </nuxt-link>
                    </p>
                    <p v-if="!isLogged">
                        <a class="header-panel__login" @click="$bvModal.show('auth-modal')">
                            <span>Вход</span>
                        </a>
                    </p>
                    <p v-if="isLogged">
                        <logout-button />
                    </p>
                    <p v-if="isLogged">
                        <nuxt-link class="header-panel__icon" to="#0">
                            <svg width="15" height="15" fill="#999"><use href="#svg-user"/></svg>
                            Профиль
                        </nuxt-link>
                    </p>
                </div>
            </div>
        </div>
        
        <b-modal class="delivery-region" id="delivery-region" style="color: black;" hide-header hide-footer>
            <button class="modal-close hidden-mobile" @click="$bvModal.hide('delivery-region')"></button>
            <button class="modal-back hidden-desktop" @click="$bvModal.hide('delivery-region'); $bvModal.show('header-menu')"></button>
            <h3>Укажите ваш регион </h3>
            <form>
                <label class="textfield">
                    <input type="text" placeholder="Москва">
                    <button class="textfield__icon" type="button">
                        <svg width="15" height="15"><use href="#svg-search"/></svg>
                        Поиск
                    </button>
                </label>
            </form>
            <ul>
                <li><a href="#0"><span>Астрахань</span></a></li>
                <li><a href="#0"><span>Балашиха</span></a></li>
                <li><a href="#0"><span>Барнаул</span></a></li>
                <li><a href="#0"><span>Брянск</span></a></li>
                <li><a href="#0"><span>Владивосток</span></a></li>
                <li><a href="#0"><span>Волгоград</span></a></li>
                <li><a href="#0"><span>Воронеж</span></a></li>
                <li><a href="#0"><span>Екатеринбург</span></a></li>
                <li><a href="#0"><span>Иваново</span></a></li>
                <li><a href="#0"><span>Ижевск</span></a></li>
                <li><a href="#0"><span>Иркутск</span></a></li>
                <li><a href="#0"><span>Казань</span></a></li>
                <li><a href="#0"><span>Калининград</span></a></li>
                <li><a href="#0"><span>Кемерово</span></a></li>
                <li><a href="#0"><span>Киров</span></a></li>
                <li><a href="#0"><span>Краснодар</span></a></li>
                <li><a href="#0"><span>Красноярск</span></a></li>
                <li><a href="#0"><span>Курск</span></a></li>
                <li><a href="#0"><span>Липецк</span></a></li>
                <li><a href="#0"><span>Магнитогорск</span></a></li>
                <li><a href="#0"><span>Махачкала</span></a></li>
                <li><a href="#0"><span>Москва</span></a></li>
                <li><a href="#0"><span>Набережные Челны</span></a></li>
                <li><a href="#0"><span>Нижний Новгород</span></a></li>
                <li><a href="#0"><span>Новокузнецк</span></a></li>
                <li><a href="#0"><span>Новосибирск</span></a></li>
                <li><a href="#0"><span>Омск</span></a></li>
                <li><a href="#0"><span>Оренбург</span></a></li>
                <li><a href="#0"><span>Пенза</span></a></li>
                <li><a href="#0"><span>Перьм</span></a></li>
                <li><a href="#0"><span>Ростов-на-Дону</span></a></li>
                <li><a href="#0"><span>Рязань</span></a></li>
                <li><a href="#0"><span>Самара</span></a></li>
                <li><a href="#0"><span>Санкт-Петербург</span></a></li>
                <li><a href="#0"><span>Саратов</span></a></li>
                <li><a href="#0"><span>Севастополь</span></a></li>
                <li><a href="#0"><span>Сочи</span></a></li>
                <li><a href="#0"><span>Ставрополь</span></a></li>
                <li><a href="#0"><span>Тверь</span></a></li>
                <li><a href="#0"><span>Тольятти</span></a></li>
                <li><a href="#0"><span>Томск</span></a></li>
                <li><a href="#0"><span>Тула</span></a></li>
                <li><a href="#0"><span>Тюмень</span></a></li>
                <li><a href="#0"><span>Улан-Удэ</span></a></li>
                <li><a href="#0"><span>Ульяновск</span></a></li>
                <li><a href="#0"><span>Уфа</span></a></li>
                <li><a href="#0"><span>Хабаровск</span></a></li>
                <li><a href="#0"><span>Чебоксары</span></a></li>
                <li><a href="#0"><span>Челябинск</span></a></li>
                <li><a href="#0"><span>Ярославль</span></a></li>
            </ul>
        </b-modal>
        
        <header-menu :isLogged="isLogged" />
        <auth-modal v-if="!isLogged" />
    </header>
    <main>
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
            version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="187 -161.8 448.8 448.8" xml:space="preserve">
            <path d="M561.5,106.7c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4 c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8 c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6 c-9.7-9.6-21.3-14.7-33.5-14.7c-12.2,0-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5 c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26 c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9 c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L561.5,106.7z M597.3,212C597.2,212,597.2,212.1,597.3,212 c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1 c-29.7-1.9-57.3-13.5-78-23.4C389,209.2,339.3,170.3,298,121c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6 c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3 c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6 C330.6-22,322.6-14,313.9-6.2c-0.2,0.2-0.4,0.3-0.5,0.5c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9 c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3 c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5 c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1C607.5,190.9,607.5,201.4,597.3,212z"/>
        </svg>
        <svg id="svg-bag" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-66 67.5 33 34" xml:space="preserve">
            <path d="M-37.7,101h-23.6c-0.1, 0-0.3-0.1-0.4-0.2c-0.1-0.1-0.1-0.2-0.1-0.4l1.1-23.6c0-0.3,0.2-0.5,0.5-0.5h21.4 c0.3,0,0.5,0.2,0.5,0.5l1.1,23.6c0,0.1,0,0.3-0.1,0.4C-37.4,100.9-37.6,101-37.7,101z M-60.8, 100h22.6l-1.1-22.6h-20.4L-60.8,100z"/>
            <path d="M-44.6,77v-3.1c0-2.7-2.2-4.9-4.9-4.9s-4.9,2.2-4.9, 4.9v2.8h-1v-2.8c0-3.3,2.6-5.9,5.9-5.9s5.9,2.6,5.9,5.9V77 C-43.6,77.3-44.6,77.3-44.6,77z"/>
        </svg>
        <svg id="svg-logout"
            viewBox="0 0 330 330">
            <path d="M245.608 84.392c-5.856-5.857-15.355-5.858-21.213-.001-5.857 5.858-5.858 15.355 0 21.213L268.789 150H85.002c-8.284 0-15 6.716-15 15s6.716 15 15 15h183.785l-44.392 44.392c-5.858 5.858-5.858 15.355 0 21.213a14.953 14.953 0 0 0 10.607 4.393 14.95 14.95 0 0 0 10.606-4.393l69.998-69.998c5.858-5.857 5.858-15.355 0-21.213l-69.998-70.002z"></path>
            <path d="M155 330c8.284 0 15-6.716 15-15s-6.716-15-15-15H40V30h115c8.284 0 15-6.716 15-15s-6.716-15-15-15H25c-8.284 0-15 6.716-15 15v300c0 8.284 6.716 15 15 15h130z"></path>
        </svg>
        <svg id="svg-user"
            viewBox="0 0 488.9 488.9">
            <path d="M477.7 454.8v-26c0-26.5-12.4-52-33.1-68.1-48.2-37.4-97.3-63.5-114.5-72.2v-29.7c3.5-7.8 6.4-16.3 8.6-25.5 12.8-4.6 19.8-23.4 24.5-40 6.3-22.1 5.6-37.6-1.8-46.2 7.8-42.5 4.3-73.8-10.3-93.1-7.7-10.1-16.7-14.4-22.7-16.3-4.3-6-13-16.1-27.7-24.2C285.5 4.5 268.4 0 249.6 0c-3.4 0-6.8.2-9.8.4-8.4.4-16.7 2-24.9 4.7-.1 0-.2.1-.3.1-9 3.1-17.8 7.6-26.3 13.4-9.7 6.2-18.6 13.6-26.3 21.8-15.1 15.5-25.1 33-29.4 51.7-4.1 15.5-4.4 31.1-1 46.4-1.8 1.3-3.4 2.8-4.8 4.6-6.9 9.1-7.2 23.4-1.1 45.1 4.2 15 9.8 30.3 19.3 37.2 2.8 14.4 7.5 27.5 13.8 39.1v24.1c-17.2 8.7-66.3 34.7-114.5 72.2-20.7 16.1-33.1 41.5-33.1 68.1v26c0 18.8 15.3 34 34 34h398.5c18.7 0 34-15.3 34-34.1zm-442.1 0v-26c0-19 8.8-37.2 23.6-48.7 52-40.3 104.9-66.9 115-71.8 5.6-2.7 9.1-8.3 9.1-14.6v-32.5c0-2.2-.6-4.3-1.7-6.2-6.6-11.2-11.2-24.6-13.5-39.9-.8-4.9-4.4-8.8-9.1-10-1.3-1.5-5-6.9-9.7-23.6-3.9-13.8-3.6-20.2-3.2-22.5 3.9.2 7.8-1.6 10.3-4.7 2.6-3.3 3.3-7.7 1.9-11.6-5.2-14.5-5.8-29.4-1.8-44.6 3.4-14.6 11.2-28.2 23.3-40.6 6.5-7 14-13.1 22-18.2.1-.1.3-.2.4-.3 6.7-4.7 13.7-8.2 20.6-10.6.1 0 .2-.1.2-.1 5.9-2 12-3.1 18.4-3.4 17.5-1.5 33.2 1.8 47.1 9.9 15.2 8.4 21.4 19.4 21.4 19.4 1.9 3.9 5.3 6.2 9.7 6.5.3 0 6.8 1 12.4 8.9 5.9 8.4 14.3 30 3.8 80.4-1.2 5.6 1.7 11.2 6.8 13.6.5 1.8 1.3 7.9-3 23.1-3.8 13.4-6.9 19.5-8.7 22.2-2.3-.4-4.7-.2-6.9.8-3.8 1.6-6.6 5.1-7.3 9.1-2.1 12-5.5 22.8-9.9 32-.8 1.7-1.2 3.5-1.2 5.3v37.6c0 6.3 3.5 11.8 9.1 14.6 10.1 4.9 63 31.6 114.9 71.8 14.8 11.5 23.6 29.7 23.6 48.7v26c0 5.2-4.3 9.5-9.5 9.5H45.2c-5.3.1-9.6-4.2-9.6-9.5z"></path>
        </svg>
        <svg id="svg-mobile"
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.442 27.442" xml:space="preserve">
            <path d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546 c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481 s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469 c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z M19.995,21.1H7.448V3.373h12.547V21.1z"/>
        </svg>
        <svg id="svg-clock"
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve">
            <path d="M30,0.061c-16.542,0-30,13.458-30,30s13.458,29.879,30, 29.879s30-13.337,30-29.879S46.542,0.061,30,0.061z M32,30.939 c0,1.104-0.896,2-2,2H14c-1.104,0-2-0.896-2-2s0.896-2, 2-2h14v-22c0-1.104,0.896-2,2-2s2,0.896,2,2V30.939z"/>
        </svg>

    </div>
    
</div>
</template>

<script>

import AuthModal from '~/components/user/AuthModal.vue'
import LogoutButton from '~/components/user/LogoutButton.vue'
import Sections from '~/components/catalog/Sections.vue'
import HeaderMenu from '~/components/HeaderMenu.vue'
import SearchForm from '~/components/catalog/search/SearchForm.vue'
import BasketSmall from '~/components/header/basket.small/Basket.vue'

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            featuresHidden: true,
            callRequestOk: false,
        }
    },
    components: {
        AuthModal,
        Sections,
        HeaderMenu,
        BasketSmall,
        SearchForm,
        LogoutButton,
    },
    methods: {
        documentClick(e) {
            let target = e.target,
                features = this.$refs.featuresToggle;
                
            if ((features !== target) && !features.contains(target)) {
                this.featuresHidden=true;
            }
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged'
        })
    },
    mounted() {
        window.addEventListener('click', this.documentClick)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.documentClick)
    }
}
</script>

<style lang="scss">
.app-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
