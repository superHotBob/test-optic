<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Мои заказы</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
                <li><nuxt-link to="/personal/orders">Мои заказы</nuxt-link></li>
            </ul>
        </div>
    </div>
    <div class="user-order main-container">
        <div class="user-order__block">
            <div class="user-order__header small">
                Заказ №37 от 06.06.2019, 1 товар на сумму 9 535.46 руб.
            </div>
        </div>

        <div class="user-order__block">
            <div class="user-order__header">Информация о заказе</div>
            <div class="user-order__body">
                <div class="user-order__info-table">
                    <div class="user-order__info-row heading">
                        <div>Ф.И.О.:</div>
                        <div>Текущий статус, от 06.06.2019:</div>
                        <div>Сумма:</div>
                        <div><button class="user-order__repeat btn-simple">Повторить заказ</button></div>
                    </div>
                    <div class="user-order__info-row">
                        <div><b>vladimir</b></div>
                        <div><b>Принят, ожидается оплата</b></div>
                        <div><b>9 535.46 руб.</b></div>
                        <div>
                            <button class="user-order__repeat btn-simple hidden-desktop mr-2">Повторить заказ</button>
                            <button class="user-order__cancel btn-simple">Отменить</button>
                        </div>
                    </div>
                </div>
                <button class="btn-simple mt-4" v-if="showInfo == false" @click="showInfo = true">Подробнее</button>
                <button class="btn-simple mt-4" v-else @click="showInfo = false">Скрыть</button>
                <div class="user-order__info-list" v-show="showInfo == true">
                    <h3>Информация о пользователе</h3>
                    <ul>
                        <li>
                            <p>Логин:</p>
                            <p>login</p>
                        </li>
                        <li>
                            <p>E-mail адрес:</p>
                            <p>test@mail.ru</p>
                        </li>
                        <li>
                            <p>Тип плательщика:</p>
                            <p>Физическое лицо</p>
                        </li>
                        <li>
                            <p>Ф.И.О.:</p>
                            <p>Иван Иванович</p>
                        </li>
                        <li>
                            <p>E-Mail:</p>
                            <p>aaa@aaa.aaa</p>
                        </li>
                        <li>
                            <p>Индекс:</p>
                            <p>101000</p>
                        </li>
                        <li>
                            <p>Местоположение:</p>
                            <p>Россия, Центр, Московская область, Москва</p>
                        </li>
                        <li>
                            <p>Город:</p>
                            <p>Москва</p>
                        </li>
                        <li>
                            <p>Адрес доставки:</p>
                            <p>ул.Доваторцев 86</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="user-order__block">
            <div class="user-order__header">Параметры оплаты</div>
            <div class="user-order__body">
                <div class="user-order__heading">

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: 'auth',
    data() {
        return {
            showInfo: false,
        }
    }
}
</script>

<style lang="scss">
.user-order {
    margin-top: 40px;
    font-size: 13px;
    a {
        display: inline-block;
    }
    &__block {
        margin-bottom: 20px;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        font-size: 21px;
        text-transform: uppercase;
        background-color: #f2f2f2;
        &.small {
            font-size: 15px;
            text-transform: none;
        }
    }
    &__body {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-bottom: 10px;
        border: 1px solid #f2f2f2;
    }
    &__info-table {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    &__info-row {
        display: flex;
        width: 100%;
        margin-bottom: 3px;
        font-size: 14px;
        &.heading {
            font-size: 13px;
            color: #888;
        }
        > div {
            word-wrap: break-word;
            flex-grow: 1;
            flex-shrink: 0;
            &:not(:last-of-type) {
                padding-right: 7px;
            }
            &:nth-of-type(1) {
                width: 30%;
            }
            &:nth-of-type(2) {
                width: 30%;
            }
            &:nth-of-type(3) {
                width: 15%;
            }
            &:nth-of-type(4) {
                text-align: center;
                width: 100px;
            }
        }
    }
    &__repeat {
        font-size: 12px;
    }
    &__cancel {
        font-size: 13px;
        color: #999;
    }
    &__info-list {
        width: 100%;
        h3 {
            padding: 10px 0;
            font-size: 21px;
            text-transform: uppercase;
            border-bottom: 1px solid #f2f2f2;
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        li {
            margin-bottom: 15px;
        }
        p {
            margin: 0;
            &:nth-of-type(1) {
                font-size: 13px;
                color: #888;
            }
            &:nth-of-type(2) {
                font-size: 14px;
                font-weight: 700;
                color: #000;
            }
        }
    }
}

@media (max-width: 768px) {
    .user-order {
        &__info-row {
            flex-wrap: wrap;
            &.heading {
                display: none;
            }
            > div {
                margin-bottom: 10px;
                &::before {
                    display: block;
                    margin-right: 7px;
                    font-size: 13px;
                    color: #888;
                }
                &:nth-of-type(n) {
                    width: 50%;
                }
                &:nth-of-type(1) {
                    &::before {
                        content: "Ф.И.О.:";
                    }
                }
                &:nth-of-type(2) {
                    &::before {
                        content: "Текущий статус:";
                    }
                }
                &:nth-of-type(3) {
                    &::before {
                        content: "Сумма::";
                    }
                }
                &:nth-of-type(4) {
                    &::before {
                        content: "Действия:";
                    }
                }
                &:nth-of-type(2),
                &:nth-of-type(4) {
                    padding: 0;
                    text-align: right;
                }
            }
        }
    }
}
</style>
