<template>
    <div>
        <form>
            <input v-model="username"/>
            <input v-model="username"/>
            <input v-model="username"/>
            <input v-model="username"/>
            <input v-model="username"/>
            <button>Зарегистрироваться</button>
        <form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:'',
            password1:'',
            email:'',
            phone:''
        }
    }
}
</script>

<style>

</style>
