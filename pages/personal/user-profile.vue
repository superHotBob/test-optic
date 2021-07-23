<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Профиль пользователя</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="user-profile main-container custom-page">
        <div v-if="error" class="alert-danger order-error mb-1" v-html="error"></div>  
        <p v-if="success" class="user-profile__saved">Изменения сохранены</p>
        <p class="mb-0">Дата обновления: {{update}}</p>
        <p>Последняя авторизация: {{active}}</p>
        <form>
            <div class="user-profile__columns mb-3">
                <label class="textfield">
                    <span>Имя:</span>
                    <input type="text" :value="name" @input="updateName($event)">
                </label>
                <label class="textfield">
                    <span>Фамилия:</span>
                    <input type="text" :value="last_name" @input="updateLast">
                </label>
                <label class="textfield">
                    <span>Отчество:</span>
                    <input type="text" :value="second_name" @input="updateSecond">
                </label>
                <label class="textfield">
                    <span>E-Mail:</span>
                    <input type="email" :value="email" @input="updateEmail">
                </label>
                <label class="textfield">
                    <span>Телефон:</span>
                    <input type="tel" :value="phone" @input="updatePhone">
                </label>
                <label class="textfield">
                    <span>Новый пароль:</span>
                    <input type="password" v-model="password">
                </label>
                <label class="textfield">
                    <span>Подтверждение нового пароля:</span>
                    <input type="password" v-model="password1">
                    <p class="mb-0 mt-1" style="font-size: 12px;">Пароль должен быть не менее 6 символов длиной.</p>
                </label>
            </div>
            <label class="textfield" style="display: flex;flex-direction: row; align-items: center; flex-wrap: wrap;">
                <input
                    v-model="rule"
                    name="rule"
                    type="checkbox"
                    checked
                    value="1"
                    data-vv-as=""
                    style="margin-right: 10px;"
                    >
                <span>Пожалуйста, подтвердите согласие на обработку персональных данных</span>
                <span v-show="ruleError" class="error" style="width: 100%">подтвердите согласие на обработку персональных данных</span>
            </label>
            <button class="button black" type="button" @click="saveUser">Сохранить</button>
            <button class="button black" type="reset" @click="resetUser">Отмена</button>
        </form>
    </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    middleware: 'auth',
    data() {
        return {
            success:false,
            password: '',
            password1: '',
            error: false,
            rule: [],
            ruleError: false
        }
    },
    methods: {
        updateName (e) {
            this.$store.commit('user/setName', e.target.value)
        },
        updateLast (e) {
            this.$store.commit('user/setLastName', e.target.value)
        },
        updateSecond (e) {
            this.$store.commit('user/setSecondName', e.target.value)
        },
        updateEmail (e) {
            this.$store.commit('user/setEmail', e.target.value)
        },
        updatePhone (e) {
            this.$store.commit('user/setPhone', e.target.value)
        },
        resetUser() {
            this.$store.dispatch('user/STATE');
            this.error = false;
        },
        async saveUser() {
            if(this.rule == 1) 
                this.ruleError = false
            else
                this.ruleError = true

            if(this.ruleError) return

            let response = await this.$store.dispatch(
                'user/UPDATE',
                {
                    'name':this.name,
                    'last_name':this.last_name,
                    'second_name':this.second_name,
                    'email':this.email,
                    'phone':this.phone,
                    'password':this.password,
                    'password1':this.password1
                }
            );

            //console.log('response', response);

            if (response['status'] == 'OK') {
                this.success = true;
            } else if (response['status'] == 'ERROR') {
                this.error = response['msg'];
            }
                
        }
    },
    computed: {
        ...mapGetters({
            name: 'user/getName',
            last_name: 'user/getLastName',
            second_name: 'user/getSecondName',
            email: 'user/getEmail',
            phone: 'user/getPhone',
            update: 'user/getUpdateDate',
            active: 'user/getLoginDate'
        })  
    }
}
</script>

<style lang="scss">
.user-profile {
    margin-top: 40px;
    &__columns {
        column-count: 2;
    }
    &__saved  {
        font-size: 16px;
        color: #008000;
    }
    .button {
        margin-right: 5px;
        padding: 0 15px;
        font-weight: 700;
    }
    label {
        break-inside: avoid;
    }
}

@media (max-width: 500px) {
    .user-profile {
        &__columns {
            column-count: auto;
        }
    }
}
</style>
