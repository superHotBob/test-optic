<template>
<div class="app-container">
    <header class="page-header">
        <div class="page-header__top">

        </div>
        <div class="page-header__main">
            
        </div>
        <div class="page-header__bottom">

        </div>
    </header>
    <main>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>

        <!-- <div class="fullscreen-overlay active">
                <div class="modal">
                    <p>33333</p>
                    <p>33333</p>
                    <p>33333</p>
                </div>
            </div> 
            <log-out/>
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
    <!-- <div class="fullscreen-overlay active"></div> -->
</div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue'
import LogOut from '~/components/user/ButtonLogout.vue'
import LoginForm from '~/components/user/LoginForm.vue'
import Order from '~/components/order/Order.vue'

export default {
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
$grey: #999;

/* open-sans-300 - latin_cyrillic */
// @font-face {
//     font-family: 'Open Sans';
//     font-style: normal;
//     font-weight: 300;
//     src: url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.eot'); /* IE9 Compat Modes */
//     src: local('Open Sans Light'), local('OpenSans-Light'),
//         url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
//         url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.woff2') format('woff2'), /* Super Modern Browsers */
//         url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.woff') format('woff'), /* Modern Browsers */
//         url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.ttf') format('truetype'), /* Safari, Android, iOS */
//         url('/static/fonts/OpenSans/open-sans-v16-latin_cyrillic-300.svg#OpenSans') format('svg'); /* Legacy iOS */
// }
html {
    height: 100%;
}
body {
    height: 100%;

    margin: 0;
    padding: 0;

    font-family: "Open Sans", "Arial", sans-serif;
    font-size: 16px;
    line-height: 24px;
    line-height: normal;
    font-weight: 400;
    color: #000;
    > div {
        height: 100%;
        > div {
            height: 100%;
        }
    }
}
main {
    position: relative;
}
.app-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}
.page-header {
    &__top {

    }
}
.page-footer {
    margin-top: auto;
}
.fullscreen-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    z-index: 50;
    &.active {
        display: block;
    }
}
.modal {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translateY(-50%);
    top: 0;
    width: auto;
    height: auto;
    background-color: lightgreen;
    overflow: unset;
    z-index: 100;
    &.flex {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
