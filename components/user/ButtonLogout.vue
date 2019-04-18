<template>
    <button v-on:click="logout" v-if="isLogged">Logout</button>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    methods: {
        async logout() {
            let response = await this.$store.dispatch('user/logout');
            this.$root.$emit('login/logout');
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged'
        })
    },
}
</script>
