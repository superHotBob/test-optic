<template>
    <div>
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
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        async login() {
            let response = await this.$store.dispatch('user/login',{'username':this.username, 'password':this.password});
            console.log(response);
        }
    }
}
</script>
