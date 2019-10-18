<template>
    <div v-if="!isLogged">
        <form @submit.prevent="login">
            <div class="form-group">
                <label>Email address</label>
                <input v-model="username" type="input" class="form-control" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-check">
                <input type="checkbox" value="Y" class="form-check-input" v-model="remember" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Remember</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            username:'',
            password:'',
            remember:false
        }
    },
    methods: {
        async login() {
            let response = await this.$store.dispatch('user/login',{'username':this.username, 'password':this.password, 'remember':this.remember});
            this.$root.$emit('login/logout');
            this.$router.push({ name: 'main'});
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged'
        })
    },
}
</script>
