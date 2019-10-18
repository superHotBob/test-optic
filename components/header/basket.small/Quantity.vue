<template>
<div class="counter">
    <button @click="quantityDown()">-</button>
    <the-mask mask="FFF" :tokens="regxNumbers" v-model="quantity"/>
    <button @click="quantityUp()">+</button>
</div>
</template>

<script>

import quantity from '~/mixins/basket/quantity.js'

export default {
    mixins: [quantity],
    data() {
        return {
            regxNumbers: {
                F: {
                    pattern: /[0-9]/,
                }
            },
        }
    },
}
</script>

<style scoped>
    .quantity .form-control {
        max-width: 50px;
        text-align: center;
        display: inline-block;
    }
    .quantity button {
        min-width: 40px;
        text-align: center;
    }
</style>
