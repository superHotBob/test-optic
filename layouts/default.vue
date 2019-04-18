<template>
<div class="page-container">
    <header class="page-header">
        <h2>Header</h2>
    </header>
    <main>
        <!-- <log-out/>
        <login-form/>
        <basket/>
        <order/> -->
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <div class="fullscreen-overlay active">
            <div class="modal">
                <p>33333</p>
                <p>33333</p>
                <p>33333</p>
            </div>
        </div>
        <div>
            <nuxt-link active-class="active" to="/" exact>Главная</nuxt-link>
        </div>
        <div>
            <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'frames' }}">Оправы</nuxt-link>
            <nuxt-link active-class="active" :to="{ name: 'section', params: { section: 'rims' }}">Линзы для очков</nuxt-link>
        </div>
        <nuxt/>
    </main>
    <footer class="page-footer">
        <h2>Footer</h2>
    </footer>
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
html {
    height: 100%;
}
body {
    height: 100%;
    > div {
        height: 100%;
        > div {
            height: 100%;
        }
    }
}
.page-container {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
    transform: translateY(-50%);
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
