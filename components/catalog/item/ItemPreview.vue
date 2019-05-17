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
                <the-mask mask="FFF" :tokens="regxNumbers" v-model="itemAmount"/>
                <button @click="itemAmount++">+</button>
            </div>
            <button class="button black">В корзину</button>
            <button class="button">
                <svg id="svg-icon-click" fill="#000" viewBox="0 0 18 25.929" width="20" height="20">
                    <path d="M18 18L8.353 8.646 7 9v14l3.658-1.835 2.196 4.764.034-.026.006.012 3.186-1.688-2.222-5.168L18 19v-1zm-4.313.062l-1.025.738 2.263 4.908-1.623.859-2.196-4.762L8 21.438V9.707l8.317 8.317-2.63.038z"></path>
                    <path d="M1 8a7 7 0 1 1 14 0 6.959 6.959 0 0 1-.697 3.03l.869.497A7.95 7.95 0 0 0 16 8 8 8 0 0 0 0 8c0 3.727 2.551 6.849 6 7.738v-1.031A7.001 7.001 0 0 1 1 8z"></path>
                    <path d="M8 5a3 3 0 0 1 3 3c0 .365-.075.709-.194 1.033l.885.506A4 4 0 1 0 4 8a3.98 3.98 0 0 0 2 3.445v-1.224C5.39 9.672 5 8.885 5 8a3 3 0 0 1 3-3z"></path>
                </svg>
                Купить в один клик
            </button>
        </div>
    </div>
</b-modal>
</template>

<script>

export default {
    data() {
        return {
            itemAmount: 1,
            showModal: false,
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                }
            }
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
