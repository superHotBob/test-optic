<template>
    <div>
        <form>
            <div class="form-group">
                <label>Email address</label>
                <input v-model="login" type="email" class="form-control" placeholder="Enter email">
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
            login:'',
            password:''
        }
    }
}
</script>
