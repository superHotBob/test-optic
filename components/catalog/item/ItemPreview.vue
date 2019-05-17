<template>
<b-modal v-model="showModal" class="item-preview" id="item-preview" hide-header hide-footer>
    <button class="modal-close" @click="$bvModal.hide('item-preview')"></button>
    <div class="item-preview__img">
        <img src="http://home-optic.proj/upload/iblock/42d/42da094c1667b67b126c6411b1eb1013.jpg" alt="">
        <div class="item__flags">
            <span class="item__flag left">NEW</span>
            <span class="item__flag right red">SALE</span>
        </div>
    </div>
    <div class="item-preview__content">
        <b class="item-preview__name">ОПРАВА BRENDEL 902221</b>
        <div class="item-preview__rating">
            <div class="rating">
                <div class="rating__stars" style="width: 80%;"></div>
            </div>
            <p>0 отзывов</p>
        </div>
        <p class="item-preview__price">22 395.03 руб.</p>
        <p class="item-preview__available">
            <svg width="15" height="15" fill="#000"><use href="#svg-layers" /></svg>
            Много
        </p>
        <div class="item__offers">
            <p>Цвет</p>
            <ul>
                <li class="selected">
                    <img src="#" alt="">
                </li>
                <li>
                    <img src="#" alt="">
                </li>
                <li>
                    <img src="#" alt="">
                </li>
            </ul>
        </div>
        <div class="item__offers">
            <p>Размер</p>
            <ul>
                <li class="selected">
                    <span>31</span>
                </li>
                <li>
                    <span>32</span>
                </li>
            </ul>
        </div>
        <hr>
        <nuxt-link class="item-preview__link" to="#0">Перейти на страницу товара ></nuxt-link>
        <div class="item-preview__buttons">
            <div class="counter">
                <button @click="counterMinus">-</button>
                <input type="number" v-model="itemAmount">
                <button @click="itemAmount++">+</button>
            </div>
        </div>
    </div>
</b-modal>
</template>

<script>

export default {
    data() {
        return {
            itemAmount: 1,
            showModal: true,
        }
    },
    methods: {
        counterMinus() {
            if (this.itemAmount <= 1) {
                return
            } else {
                this.itemAmount--;
            }
        }
    }

}
</script>
