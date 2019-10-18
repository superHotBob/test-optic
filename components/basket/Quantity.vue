<template>
    <span class="quantity">Количество: 
        <button class="btn btn-secondary" v-on:click="quantityDown">-</button>
        <input class="form-control" v-model="quantity"/>
        <button class="btn btn-secondary" v-on:click="quantityUp">+</button>
    </span>
</template>

<script>

import quantity from '~/mixins/basket/quantity.js'

export default {
    mixins: [quantity]
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
