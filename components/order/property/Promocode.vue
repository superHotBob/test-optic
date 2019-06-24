<template>
<div class="promocode">
    <label class="o-prop textfield promofield">
        <span>Применить купон:</span>
        <div class="promofield__wrapper">
            <input type="text" @keydown.prevent.enter="addPromocode" v-model="code">
            <span class="promofield__button" @click="addPromocode"></span>
        </div>
    </label>
    <ul v-if="promocode">
        <template v-for="(code, index) in promocode">
            <li :key="index" v-if="code.ACTIVE === 'Y'">
                {{code.COUPON}}
                <span class="delete" @click="delPromo(code.COUPON)"></span>
            </li>
        </template>
    </ul>
</div>
</template>

<script>
export default {
    props: ['promocode'],
    data() {
        return {
            code: '',
        }
    },
    methods: {
        addPromocode() {
            if (this.code != '') {
                this.$store.dispatch('basket/ADD_COUPON', this.code);
            }     
        },
        delPromo(text) {
            this.$store.dispatch('basket/DELETE_CPUPON', text);
        }
    }
}
</script>

<style lang="scss">
.promocode {
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        display: flex;
        word-wrap: break-word;
        margin: 0;
        margin-top: 5px;
        margin-right: 20px;
        padding: 0;
        color: #A94442;
        font-weight: 700;
    }
    .delete {
        position: relative;
        width: 20px;
        margin-left: 2px;
        cursor: pointer;
        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 9px;
            width: 2px;
            height: 14px;
            background-color: #000;
        }
        &::before {
            transform: translateY(-50%) rotate(-45deg);
        }
        &::after {
            transform: translateY(-50%) rotate(45deg);
        }
    }
    .promofield {
        margin: 0;
        width: 200px;
        input {
            width: 100%;
        }
        &__wrapper {
            position: relative;
        }
        &__button {
            position: absolute;
            right: 0;
            top: 0;
            width: 20px;
            height: 100%;
            margin: 0;
            background-color: transparent;
            cursor: pointer;
            &::before {
                content: "";
                position: absolute;
                top: 50%;
                right: 6px;
                width: 10px;
                height: 10px;
                border-right: 2px solid #000;
                border-bottom: 2px solid #000;
                transform: translateY(-50%) rotate(-45deg);
            }
        }
    }
}
</style>
