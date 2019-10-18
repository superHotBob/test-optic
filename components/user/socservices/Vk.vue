<template>
    <div v-if="!isLogged">
        <button @click="login">VK</button>
    </div>
</template>

<script>

import qs from 'qs';
import { mapGetters } from 'vuex';

export default {
    methods: {
        login() {
            VK.Auth.login(this.loginCallback);
        },
        async loginCallback(response) {
            let user = await this.$axios.$post(`/api/v1/user/socservices/`, qs.stringify({'socservice':response.session}));
            this.$store.dispatch('user/socservices',user);
        }
    },
    mounted() {
        VK.init({apiId: '6728642'});
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged'
        })
    },
}
</script>

<style>

</style>
