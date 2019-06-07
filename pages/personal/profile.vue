<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Профиль №26</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="profile main-container custom-page">
        <p><nuxt-link to="/personal/profiles">В список профилей</nuxt-link></p>
        <form>
            <h4 class="big-text-bold mt-4">Профиль №26</h4>
            <div class="profile__columns">
                <label class="textfield">
                    <span>Название: <i>*</i></span>
                    <input type="text" required>
                </label>
                <label class="textfield">
                    <span>Тип плательщика</span>
                    <p class="mb-0">Физическое лицо</p>
                </label>
            </div>

            <h4 class="big-text-bold mt-4">Личные данные</h4>
            <div class="profile__columns">
                <label class="textfield">
                    <span>Ф.И.О.: <i>*</i></span>
                    <input type="text" required>
                </label>
                <label class="textfield">
                    <span>E-Mail: <i>*</i></span>
                    <input type="email" required>
                </label>
                <label class="textfield">
                    <span>Телефон: <i>*</i></span>
                    <input type="tel" required>
                </label>
            </div>

            <h4 class="big-text-bold mt-4">Данные для доставки</h4>
            <template v-for="prop in getProps">
                <location class="profile__location" v-if="prop.TYPE === 'LOCATION'" v-bind:property="prop" :key="prop.ID"/>
            </template>
            <div class="profile__columns">
                <label class="textfield">
                    <span>Индекс: <i>*</i></span>
                    <input type="text" required>
                </label>
                <label class="textfield">
                    <span>Город: <i>*</i></span>
                    <input type="text" required>
                </label>
                <label class="textfield">
                    <span>Адрес доставки: <i>*</i></span>
                    <textarea rows="5"></textarea>
                </label>
            </div>
            <div class="profile__buttons">
                <button class="button black" type="button">Сохранить</button>
                <button class="button black" type="button">Применить</button>
                <button class="button black" type="reset">Отмена</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import Location from '~/components/order/property/Location.vue'

export default {
    components: {
        Location,
    },
    computed: {
        ...mapGetters({
            getProps: 'order/getProperties',
        }),
    },
}
</script>

<style lang="scss">
.profile {
    &__location {
        margin-bottom: 10px;
        .o-prop__input {
            width: 100%;
        }
        p {
            margin-bottom: 6px;
            color: #4a4a4a;
        }
    }
    a {
        color: #000;
    }
    margin-top: 40px;
    &__columns {
        column-count: 2;
    }
    label {
        break-inside: avoid;
        div {
            break-inside: avoid;
        }

    }
    i {
        font-style: normal;
        color: red;
    }
    textarea {
        height: auto;
    }
    &__buttons {
        .button {
            padding: 0 15px;
            font-weight: 700;
        }
    }
}

@media (max-width: 768px) {
    .profile {
        .o-prop {
            p {
                margin-bottom: 4px;
                font-size: 12px;
            }
        }
    }
}
@media (max-width: 500px) {
    .profile {
        &__columns {
            column-count: auto;
        }
    }
}
</style>
