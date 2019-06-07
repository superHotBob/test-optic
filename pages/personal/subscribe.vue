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
    <div class="subscribe main-container custom-page">
        <h4 class="big-text-bold">Авторизация</h4>
        <p class="mb-1">Адрес подписки будет принадлежать пользователю: *имя пользователя*</p>
        <p>Вы можете <a @click="logout">закончить сеанс</a>, чтобы авторизоваться под другим пользователем.</p>
        <form>
            <h4 class="big-text-bold">Настройки подписки</h4>
            <label class="textfield">
                <span>Ваш e-mail</span>
                <input type="email" required>
            </label>

            <p class="mb-1 mt-4">Рубрики подписки*</p>
            <label class="checkbox">
                <input type="checkbox" name="shop-news" value="Y" checked>
                <i class="checkbox__indicator"></i>
                Новости магазина
            </label>

            <p class="mb-1 mt-4">Предпочтительный формат</p>
            <label class="radio">
                <input type="radio" name="news-format" value="text" checked>
                <i class="radio__indicator"></i>
                <span>Текст</span>
            </label>
            <span class="ml-3 mr-3">/</span>
            <label class="radio">
                <input type="radio" name="news-format" value="HTML">
                <i class="radio__indicator"></i>
                <span>HTML</span>
            </label>

            <p class="mt-4 mb-1">После добавления или изменения адреса подписки вам будет выслан код подтверждения.</p>
            <p>Подписка будет не активной до ввода кода подтверждения.</p>
            <button class="button black" type="button">Изменить</button>
            <button class="button black" type="reset">Сброс</button>
        </form>

        <p class="mt-4 mb-2">Состояние подписки</p>

        <form class="mt-4 mb-4">
            <p class="mb-1">Подтверждение подписки</p>
            <label class="textfield mb-1">
                <span>Введите код подтвержения подписки*</span>
                <input type="text" required>
            </label>
            <p>Если вы еще не получили письмо с кодом подтверждения, вы можете повторно <a>запросить код</a>.</p>
            <p class="mb-1">Дата генерации кода подтвержения</p>
            <p class="mb-1">06.06.2019 17:20:40</p>
            <button class="button black">Подтвердить</button>
        </form>

        <p class="mb-2">Ваша подписка не подтверждена. Чтобы подтвердить подписку, введите код подтверждения в форме выше.</p>
        <table width="300px" border="0" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td>Подписка подтверждена:</td>
                    <td>Нет</td>
                </tr>
                <tr>
                    <td>Подписка активна:</td>
                    <td>Да</td>
                </tr>
                <tr>
                    <td>Идентификатор подписки:</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Дата добавления:</td>
                    <td>06.06.2019 17:20:40</td>
                </tr>
                <tr>
                    <td>Дата модификации:</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        async logout() {
            let response = await this.$store.dispatch('user/logout');
            this.$root.$emit('login/logout');
        }
    },
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
