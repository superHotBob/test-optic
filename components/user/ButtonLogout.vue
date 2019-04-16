<template>
    <button v-on:click="logout" v-if="isLogged">Logout</button>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    methods: {
        async logout() {
            let response = await this.$store.dispatch('user/logout');
            console.log(response);
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged'
        })
    },
}
</script>
