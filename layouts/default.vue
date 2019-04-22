<template>
<div class="app-container">
    <header class="page-header">
        <div class="page-header__top">
            <div class="main-container">
                <div class="page-header__region" @click="regionModal = !regionModal">
                    <p style="">Ваш регион доставки: Санкт-Петербург</p>
                </div>
                <div class="fs-overlay" v-if="regionModal" @click.self="regionModal = !regionModal">
                    <div class="modal modal-region">
                        <p>33333</p>
                        <p>33333</p>
                        <p>33333</p>
                    </div>
                </div>
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
        <div class="page-header__main">
            <div></div>
        </div>
        <div class="page-header__bottom">

        </div>
        <button type="button" class="btn btn-primary">Primary</button>
    </header>
    <main>
        <p>12345</p>
        <p>12345</p>
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
</div>
</template>

<script>


import LogOut from '~/components/user/ButtonLogout.vue'
import LoginForm from '~/components/user/LoginForm.vue'

export default {
    data() {
        return {
            regionModal: false,
            featuresHidden: true
        }
    },
    components: {
        LoginForm,
        LogOut,
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
