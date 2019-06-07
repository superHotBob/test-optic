<template>
<div>
    <div class="content-header">
        <div class="main-container">
            <h2>Профили</h2>
            <ul class="breadcrumbs">
                <li><nuxt-link to="/">Главная</nuxt-link></li>
                <li><nuxt-link to="/personal">Мой кабинет</nuxt-link></li>
                <li><a>Профили</a></li>
            </ul>
        </div>
    </div>
    <div class="profiles main-container">
        <div class="profiles__profile">
            <div class="profiles__col">26</div>
            <div class="profiles__col">06.06.2019 14:47:52</div>
            <div class="profiles__col">Название профиля</div>
            <div class="profiles__col">Физическое лицо</div>
            <div class="profiles__col">
                <nuxt-link class="btn-simple" to="/personal/profiles/profile">Изменить</nuxt-link>
                <span>|</span>
                <button class="profiles__delete"></button>
            </div>
        </div>
        <div class="profiles__profile">
            <div class="profiles__col">26</div>
            <div class="profiles__col">06.06.2019 14:47:52</div>
            <div class="profiles__col">Название профиля</div>
            <div class="profiles__col">Физическое лицо</div>
            <div class="profiles__col">
                <nuxt-link class="btn-simple" to="/personal/profiles/profile">Изменить</nuxt-link>
                <span>|</span>
                <button class="profiles__delete"></button>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.profiles {
    margin-top: 40px;
    &__profile {
        display: flex;
        margin-bottom: 5px;
        font-size: 13px;
        color: #4a4a4a;
        &:first-of-type {
            .profiles__col {
                &::before {
                    display: block;
                    font-weight: 700;
                }
            }
        }
    }
    &__col {
        position: relative;
        flex-grow: 1;
        word-break: break-word;
        &:not(:last-of-type) {
            padding-right: 7px;
        }
        
        &:nth-of-type(1) {
            width: 66px;
            &::before {
                content: "Код";
                display: none;
            }
        }
        &:nth-of-type(2) {
            width: 312px;
            &::before {
                content: "Дата обновления";
                display: none;
            }
        }
        &:nth-of-type(3) {
            width: 171px;
            &::before {
                content: "Название";
                display: none;
            }
        }
        &:nth-of-type(4) {
            width: 313px;
            &::before {
                content: "Тип плательщика";
                display: none;
            }
        }
        &:nth-of-type(5) {
            width: 100px;
            text-align: center;
            flex-grow: 0;
            flex-shrink: 0;
            &::before {
                content: "Действия";
                display: none;
            }
        }
    }
    .btn-simple {
        text-decoration: none;
        color: #4a4a4a;
    }
    &__delete {
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        padding: 0;
        background-color: transparent;
        border: none;
        border-radius: 0;
        cursor: pointer;
        &:hover,
        &:focus {
            outline: none;
        }
        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 12px;
            background-color: #f00;
        }
        &::before {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        &::after {
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
}
@media (min-width: 601px) {
    .profiles {
        &__profile {
            &:first-of-type {
                .profiles__col {
                    &::before {
                        position: absolute;
                        top: -24px;
                        left: 0;
                    }
                    &:last-of-type {
                        &::before {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }    
}
@media (max-width: 600px) {
    .profiles {
        &__profile {
            flex-wrap: wrap;
            margin-bottom: 30px;
            &::before {
                position: static;
            }
        }
        &__col {
            border: 1px solid #ccc;
            &:nth-of-type(n) {
                &::before {
                    display: block;
                    font-weight: 700;
                }
            }
            &:nth-of-type(1),
            &:nth-of-type(2),
            &:nth-of-type(3),
            &:nth-of-type(4) {
                width: 50%;
                text-align: center;
            }
            &:nth-of-type(5) {
                width: 100%;
            }
        }
    }
}
</style>
