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
        <p class="user-profile__saved">Изменения сохранены</p>
        <p class="mb-0">Дата обновления: 19.04.2019 15:23:58</p>
        <p>Последняя авторизация: 06.06.2019 17:08:03</p>
        <form>
            <div class="user-profile__columns mb-3">
                <label class="textfield">
                    <span>Имя:</span>
                    <input type="text">
                </label>
                <label class="textfield">
                    <span>Фамилия:</span>
                    <input type="text">
                </label>
                <label class="textfield">
                    <span>Отчество:</span>
                    <input type="text">
                </label>
                <label class="textfield">
                    <span>E-Mail:</span>
                    <input type="email">
                </label>
                <label class="textfield">
                    <span>Телефон:</span>
                    <input type="tel">
                </label>
                <label class="textfield">
                    <span>Новый пароль:</span>
                    <input type="password">
                </label>
                <label class="textfield">
                    <span>Подтверждение нового пароля:</span>
                    <input type="password">
                    <p class="mb-0 mt-1" style="font-size: 12px;">Пароль должен быть не менее 6 символов длиной.</p>
                </label>
            </div>
            <button class="button black" type="button">Сохранить</button>
            <button class="button black" type="reset">Отмена</button>
        </form>
    </div>
</div>
</template>

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
