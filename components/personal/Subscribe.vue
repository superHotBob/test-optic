<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Рассылки</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="subscribe main-container custom-page" id="form_subscriber">
        <h4 class="big-text-bold">Авторизация</h4>
        <p class="mb-1">Адрес подписки будет принадлежать пользователю: *имя пользователя*</p>
        <p>Вы можете <a @click="logout">закончить сеанс</a>, чтобы авторизоваться под другим пользователем.</p>
        <div class="alert alert-danger" role="alert" v-bind:key="error"  v-for="error in subscriber.errors">
            <strong>{{error}}</strong>
        </div>
        <div class="alert alert-success" role="alert" v-if="subscriber.success.length>0">
            <strong>{{subscriber.success}}</strong>
        </div>
        <form>
            <h4 class="big-text-bold">Настройки подписки</h4>
            <label class="textfield">
                <span>Ваш e-mail</span>
                <input type="email" v-model="email" required>
            </label>

            <p class="mb-1 mt-4">Рубрики подписки*</p>
            <label class="checkbox" v-for="list in subscriber.list_sub" v-bind:key="list">
                <input type="checkbox" v-model="subscribe_id" :value="list.ID" checked>
                <i class="checkbox__indicator"></i>
                {{list.NAME}}
            </label>

            <p class="mb-1 mt-4">Предпочтительный формат</p>
            <label class="radio">
                <input type="radio" v-model="format" value="text" checked>
                <i class="radio__indicator"></i>
                <span>Текст</span>
            </label>
            <span class="ml-3 mr-3">/</span>
            <label class="radio">
                <input type="radio" v-model="format" value="html">
                <i class="radio__indicator"></i>
                <span>HTML</span>
            </label>
            <label class="textfield" style="flex-direction: row; align-items: center; flex-wrap: wrap;">
                <input
                    v-validate="'required'"
                    v-model="rule"
                    name="rule"
                    type="checkbox"
                    checked
                    value="1"
                    data-vv-as=""
                    style="margin-right: 10px;"
                    >
                <span>Я даю согласие на обработку персональных данных</span>
                <span v-show="ruleError" class="error" style="width: 100%">Пожалуйста, подтвердите согласие на обработку персональных данных</span>
            </label>
            <p class="mt-4 mb-1">После добавления или изменения адреса подписки вам будет выслан код подтверждения.</p>
            <p>Подписка будет не активной до ввода кода подтверждения.</p>
            <button class="button black" @click="submitForm" type="button">Изменить</button>
            <button class="button black" type="reset">Сброс</button>
        </form>

        <p class="mt-4 mb-2">Состояние подписки</p>

        <form class="mt-4 mb-4">
            <p class="mb-1">Подтверждение подписки</p>
            <label class="textfield mb-1">
                <span>Введите код подтвержения подписки*</span>
                <input type="text" v-model="confirm_code" required>
            </label>
            <p>Если вы еще не получили письмо с кодом подтверждения, вы можете повторно <a @click="submitForm">запросить код</a>.</p>
            <div v-if="subscriber.mailing">
                <p class="mb-1">Дата генерации кода подтвержения</p>
                <p class="mb-1">{{subscriber.user.DATE_CONFIRM}}</p>
            </div>
            <button class="button black" @click="submitConfirm" type="button">Подтвердить</button>
        </form>

        <p class="mb-2">Ваша подписка не подтверждена. Чтобы подтвердить подписку, введите код подтверждения в форме выше.</p>
        <table width="300px" border="0" cellpadding="0" cellspacing="0">
            <tbody>
                <tr v-if="subscriber.mailing">
                    <td>Подписка подтверждена:</td>
                    <td>Да</td>
                </tr>
                <tr v-if="subscriber.user.ACTIVE == 'Y'">
                    <td>Подписка активна:</td>
                    <td>Да</td>
                </tr>
                <tr v-else>
                    <td>Подписка активна:</td>
                    <td>Нет</td>
                </tr>
                <tr v-if="subscriber.user.ID > 0">
                    <td>Идентификатор подписки:</td>
                    <td>{{subscriber.user.ID}}</td>
                </tr>
                <tr v-if="subscriber.user.DATE_INSERT">
                    <td>Дата добавления:</td>
                    <td>{{subscriber.user.DATE_INSERT}}</td>
                </tr>
                <tr v-if="subscriber.user.DATE_UPDATE">
                    <td>Дата модификации:</td>
                    <td>{{subscriber.user.DATE_UPDATE}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import qs from 'qs';
export default {
    name: "app",
    data() {
        return {
            'subscribe_id': [],
            'email': '',
            'format': '',
            'action':'confirm',
            'confirm_code': '',
            rule: [],
            ruleError: false
        }
    },
    props: ['subscriber'],
	methods: {
        async logout() {
            let response = await this.$store.dispatch('user/logout');
            this.$root.$emit('login/logout');
        },
        async submitForm() {
            if(this.rule == 1) 
                this.ruleError = false
            else
                this.ruleError = true

            if(this.ruleError) return
                
            var params = {
                'subscribe_id': this.subscribe_id,
                'email':this.email,
                'format':this.format,
                'action':'subscribe',
                'confirm_code':this.confirm_code
            }

            //console.log('method', params);

            const resp = await this.$store.dispatch('subscribe/getParameters', params);
            //console.log('resp', resp);
            return this.subscriber = {
                user: resp.user,
                errors: resp.errors,
                success: resp.success,
                mailing: resp.mailing,
                list_sub: resp.list_sub,
                requests: resp.requests
            };
            
        },
        async submitConfirm() {
            //console.log(this);
            if(this.rule == 1) 
                this.ruleError = false
            else
                this.ruleError = true

            if(this.ruleError) return
                
            var params = {
                'subscribe_id': this.subscribe_id,
                'email':this.email,
                'format':this.format,
                'action':'confirm',
                'confirm_code':this.confirm_code
            }
            //console.log('method', params);

            const resp = await this.$store.dispatch('subscribe/getParameters', params);
            //console.log('resp', resp);
            return this.subscriber = {
                user: resp.user,
                errors: resp.errors,
                success: resp.success,
                mailing: resp.mailing,
                list_sub: resp.list_sub,
                requests: resp.requests
            };
        }
    }
}
</script>

<style lang="scss">
.subscribe {
    margin-top: 40px;
    a {
        text-decoration: none;
        color: #000;
        cursor: pointer;
    }
    .textfield {
        max-width: 400px;
    }
    .button {
        margin-right: 5px;
        padding: 0 15px;
        font-weight: 700;
    }
    span {
        font-size: 13px;
    }
}
</style>