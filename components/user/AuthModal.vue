<template>
<b-modal class="auth-modal" id="auth-modal" hide-header hide-footer>
    <div class="modal-wrap">
        <button class="modal-close" @click="$bvModal.hide('auth-modal')"></button>
        <p class="auth-modal__header">
            <span
                :class="{'active': (loginShown && !passwordRecovery)}"
                @click="loginShown = true; passwordRecovery = false;"
            >
                Авторизация
            </span>
            /
            <span
                :class="{'active': (!loginShown && !passwordRecovery)}"
                @click="loginShown = false; passwordRecovery = false;"
            >
                Регистрация
            </span>
        </p>
       
        <form
            ref="form-login"
            v-show="loginShown && !passwordRecovery"
            @submit.prevent="validateForm('form-login')"
            data-vv-scope="form-login">
             <div class="alert-danger" v-if="showError" v-html="showError"></div>
            <label class="textfield">
                <span>Логин</span>
                <input
                    name="username"
                    type="text"
                    v-model="username"
                    v-validate="'required'"
                    data-vv-as="Логин">
                <span v-show="errors.has('form-login.username')" class="error">{{ errors.first('form-login.username') }}</span>
            </label>
            <label class="textfield">
                <span>Пароль</span>
                <input
                    v-validate="'required'"
                    v-model="password"
                    name="password"
                    type="password"
                    data-vv-as="Пароль">
                <span v-show="errors.has('form-login.password')" class="error">{{ errors.first('form-login.password') }}</span>
            </label>
            <button class="auth-modal__submit button black" type="submit">Войти</button>
            <span
                class="auth-modal__forgot-pwd"
                @click="loginShown = false; passwordRecovery = true;"
            >
                Забыли пароль?
            </span>
        </form>

        <form 
            method="POST"
            ref="form-register"
            v-show="!loginShown && !passwordRecovery"
            @submit.prevent="validateForm('form-register')"
            data-vv-scope="form-register">
            <div v-if="showErrors" v-html="showErrors" class="alert-danger order-error mb-1"></div>   
            <label class="textfield">
                <span>Логин</span>
                <input
                    v-validate="'required'"
                    v-model="username"
                    name="username"
                    type="text"
                    data-vv-as="Логин">
                <span v-show="errors.has('form-register.username')" class="error">{{ errors.first('form-register.username') }}</span>
            </label>
            <label class="textfield">
                <span>Имя</span>
                <input
                    v-validate="'required'"
                    v-model="name"
                    name="name"
                    type="text"
                    data-vv-as="Имя">
                <span v-show="errors.has('form-register.name')" class="error">{{ errors.first('form-register.name') }}</span>
            </label>
            <label class="textfield">
                <span>E-mail</span>
                <input
                    v-validate="'required'"
                    v-model="email"
                    name="email"
                    type="text"
                    data-vv-as="E-mail">
                <span v-show="errors.has('form-register.email')" class="error">{{ errors.first('form-register.email') }}</span>
            </label>
            <label class="textfield">
                <span>Телефон</span>
                <input
                    v-validate="'required'"
                    v-model="phone"
                    name="phone"
                    type="text"
                    data-vv-as="Телефон">
                <span v-show="errors.has('form-register.phone')" class="error">{{ errors.first('form-register.phone') }}</span>
            </label>
            <label class="textfield">
                <span>Пароль</span>
                <input 
                    ref="regPassword"
                    name="password"
                    type="password"
                    v-model="password"
                    v-validate="'required'"
                    data-vv-as="Пароль">
                <span v-show="errors.has('form-register.password')" class="error">{{ errors.first('form-register.password') }}</span>
            </label>
            <label class="textfield">
                <span>Повторите пароль</span>
                <input
                    name="password_confirmation"
                    type="password"
                    v-model="passwordConfirmation"
                    v-validate="'required|confirmed:regPassword'"
                    data-vv-as="Повторите пароль">
                <span v-show="errors.has('form-register.password_confirmation')" class="error">{{ errors.first('form-register.password_confirmation') }}</span>
            </label>
            <button class="auth-modal__submit button black" @click.prevent="register" type="submit">Зарегистрироваться</button>
        </form>

        <form
            ref="form-recovery"
            v-show="passwordRecovery"
            @submit.prevent="validateForm('form-recovery')"
            data-vv-scope="form-recovery">
            <label class="textfield">
                <span>Логин</span>
                <input
                    v-validate="'required'"
                    v-model="username"
                    name="name"
                    type="text"
                    data-vv-as="Логин">
                <span v-show="errors.has('form-recovery.name')" class="error">{{ errors.first('form-recovery.name') }}</span>
            </label>
            <button class="auth-modal__submit button black" type="submit">Восстановить пароль</button>
        </form>
    </div>
</b-modal>
</template>

<script>

import { Validator } from "vee-validate";

export default {
    data() {
        return {
            username: '',
            password: '',
            passwordConfirmation: '',
            email:'',
            name:'',
            phone:'',
            remember: false,
            loginShown: true,
            passwordRecovery: false,
            showErrors:false,
            showError:false
        }
    },
    mounted(){
        
    },
    methods: {
        async login() {
            let response = await this.$store.dispatch(
                'user/login',
                {
                    'username':this.username, 
                    'password':this.password, 
                    'remember':this.remember
                }
            );
            if (response.data.TYPE === 'ERROR') {
                this.showError = response.data.MESSAGE;
                return;
            }

            this.$root.$emit('login/logout');
            this.$router.push({ name: 'main'});
        },
        async register() {
            let response = await this.$store.dispatch(
                'user/REGISTER',
                {
                    'username':this.username, 
                    'name':this.name,
                    'password':this.password, 
                    'password1':this.passwordConfirmation,
                    'email':this.email,
                    'phone':this.phone
                }
            );

            if (response.data.ERRORS) {
                this.showErrors = response.data.ERRORS;
            } else {
                this.showErrors = false;
                this.$store.dispatch('user/STATE');
            }
                
                
        },
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result && (scope == 'form-login')) {
                    this.login();
                } else if (result){
                    this.$refs[scope].submit();
                }
            });
        },
    },
}
</script>

<style lang="scss">
.auth-modal {
    .alert-danger {
        padding: 10px;
        margin-bottom: 10px;
    }
    .modal-dialog {
        max-width: 970px;
    }
    .modal-body {
        padding: 20px;
    }
    .modal-wrap {
        padding: 40px 0;
    }
    &__header {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
        color: #999;
        span {
            cursor: pointer;
            &.active {
                color: #000
            }
        }
    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        margin: 0 auto;
        margin-top: 30px;
    }
    &__forgot-pwd {
        margin: 0 auto;
        margin-top: 45px;
        padding: 0;
        font-size: 14px;
        color: #4a4a4a;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
}

@media (min-width: 769px) {
    .auth-modal {
        input {
            height: 40px;
        }
        &__submit {
            margin-top: 5px;
        }
        &__forgot-pwd {
            &:hover,
            &:focus {
                color: #000;
                outline: none;
            }
        }
    }
}
@media (max-width: 768px) {
    .auth-modal {
        .modal-dialog {
            margin: 0;
        }
        .modal-body {
            min-height: 100vh;
            padding: 0;
            padding-top: 90px;
        }
        .modal-wrap {
            position: static;
            padding: 0;
            border: none;
        }
        form {
            padding: 0 32px;
        }
    }
}
</style>
