<template>
<div class="promocode">
    <label class="o-prop textfield promofield">
        <span>Применить купон:</span>
        <input type="text" @keydown.prevent.enter="addPromocode" v-model="code">
    </label>
    <ul v-if="promocode.length">
        <li v-for="(code, index) in promocode" :key="index">{{code}}<span class="delete" @click="delPromo(code)"></span>
        </li>
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
            this.promocode.push(this.code)
        },
        delPromo(text) {
            let index = this.promocode.indexOf(text)
            this.promocode.splice(index, 1)
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
    }
}
</style>
