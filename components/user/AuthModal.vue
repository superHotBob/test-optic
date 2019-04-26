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

            <form @submit.prevent="login" v-if="loginShown && !passwordRecovery">
                <label class="textfield">
                    <span>Логин</span>
                    <input name="name" type="text" v-model="username">
                </label>
                <label class="textfield">
                    <span>Пароль</span>
                    <input name="password" type="password" v-model="password">
                </label>
                <button class="auth-modal__submit button black" type="submit">Войти</button>
                <button
                    class="auth-modal__forgot-pwd"
                    @click="loginShown = false; passwordRecovery = true;"
                >
                    Забыли пароль?
                </button>
            </form>

            <form v-if="!loginShown && !passwordRecovery">
                <label class="textfield">
                    <span>Логин</span>
                    <input name="name" type="text">
                </label>
                <label class="textfield">
                    <span>Пароль</span>
                    <input name="password" type="password">
                </label>
                <label class="textfield">
                    <span>Повторите пароль</span>
                    <input name="password2" type="password">
                </label>
                <button class="auth-modal__submit button black" type="submit">Зарегистрироваться</button>
            </form>

            <form v-if="passwordRecovery">
                <label class="textfield">
                    <span>Логин</span>
                    <input name="name" type="text">
                </label>
                <button class="auth-modal__submit button black" type="submit">Восстановить пароль</button>
            </form>
        </div>
    </b-modal>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            remember: false,
            loginShown: true,
            passwordRecovery: false
        }
    },
    methods: {
        async login() {
            let response = await this.$store.dispatch('user/login',{'username':this.username, 'password':this.password, 'remember':this.remember});
            this.$root.$emit('login/logout');
        }
    },
}
</script>

<style lang="scss">
.auth-modal {
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
