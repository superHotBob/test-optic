<template>
<div class="card-tabs">
    <div class="card-tabs__slider" v-swiper:card__tabs="tabsOptions">
        <div class="swiper-wrapper">
            <p class="swiper-slide"
                :class="{'active': tabs[1].show == true}"
                v-if="tabs[1].has"
                @click="toggleTab(1)"
            >Описание</p>
            <p class="swiper-slide"
                :class="{'active': tabs[2].show == true}"
                v-if="tabs[2].has"
                @click="toggleTab(2)"
            >Характеристики</p>
            <p class="swiper-slide"
                :class="{'active': tabs[3].show == true}"
                v-if="tabs[3].has"
                @click="toggleTab(3)"
            >Мультипокрытие</p>
            <p class="swiper-slide"
                :class="{'active': tabs[4].show == true}"
                v-if="tabs[4].has"
                @click="toggleTab(4)"
            >Доп. возможности</p>
            <p class="swiper-slide"
                :class="{'active': tabs[5].show == true}"
                v-if="tabs[5].has"
                @click="toggleTab(5)"
            >Задать вопрос</p>
            <p class="swiper-slide"
                :class="{'active': tabs[6].show == true}"
                v-if="tabs[6].has"
                @click="toggleTab(6)"
            >Отзывы</p>
        </div>
    </div>
    <div class="card-tabs__tabs">
        <div class="card-tabs__tab" v-if="tabs[1].has" v-show="tabs[1].show">
            <p>Линза Essilor 1,5 Orma Varilux X Crizal Prevencia - это инновационные полимерные линзы Verilux X Series с топовым мультипокрытием.</p>
            Verilux X - Благодаря инновационной технологии X-tend, которая является ключевой для всех дизайнеров Verilux X, пользователи получают совершенно новые возможности - расширенное зрение в пределах длинны руки с сохранением великолепного зрения вдаль, на среднем расстоянии и вблизи.<br>
            Технология Nanoptix и Synchroneyes, впервые реализованные в дизайнах Varilux S, применяются также в Varilux X, обеспечивая отсутствие "плавающего" эффекта и максимально широкие поля зрения.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;С новой технологией X-tend, линзы существенно снижают поисковые движения головы. Больше не нужно искать правильный уголнаклона головы, чтобы видеть четко.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Материал Orma 1,5 рекомендован для коррекции невысокой степени аметропии до 3,0 D.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Не рекомендован для безободковых оправ при небольших оптических силах.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Линзы с мультипокрытием Crizal Prevencia - это первые прозрачные линзы, которые предотвращает долгосрочное повреждение ваших глаз. Защищают от вредного сине-фиолетового света экранов электронных устройств.<br>
            Технология Light Scan, реализованная в покрытии Crizal Prevencia, избирательно фильтрует опасный сине-фиолетовый свет, позволяя полезному сине-голубому свету беспрепятственно проходить через линзу. При этом длительная работа за компьютером не вызывает усталости, и надолго сохраняется здоровье глаз.
        </div>
        <div class="card-tabs__tab" v-if="tabs[2].has" v-show="tabs[2].show">
            <ul class="card-tabs__attributes">
                <li>
                    <span class="grey">Артикул:</span>
                    <span>1544</span>
                </li>
                <li>
                    <span class="grey">Бренд:</span>
                    <span>Essilor</span>
                </li>
                <li>
                    <span class="grey">Гарантия:</span>
                    <span>1 год</span>
                </li>
                <li>
                    <span class="grey">Дизайн:</span>
                    <span>Прогрессивный</span>
                </li>
                <li>
                    <span class="grey">Индекс уточнения:</span>
                    <span>1,5 (стандартный)</span>
                </li>
                <li>
                    <span class="grey">Материал:</span>
                    <span>Полимер (пластик)</span>
                </li>
                <li>
                    <span class="grey">Мультипокрытие:</span>
                    <span>Crizal Prevencia</span>
                </li>
                <li>
                    <span class="grey">Назначение:</span>
                    <span>Для близи / Для постоянного ношения / Для работы за компьютером / Универсальные</span>
                </li>
                <li>
                    <span class="grey">Отсечение UVA (%):</span>
                    <span>93</span>
                </li>
                <li>
                    <span class="grey">Отсечение UVB (%):</span>
                    <span>100</span>
                </li>
                <li>
                    <span class="grey">Производитель:</span>
                    <span>Essilor</span>
                </li>
                <li>
                    <span class="grey">Свойства:</span>
                    <span>Защищают от вредного сине-фиолетового спектра излучения / Сохраняют идеальное зрение на всех дистанциях</span>
                </li>
                <li>
                    <span class="grey">Страна производителя:</span>
                    <span>Франция</span>
                </li>
                <li>
                    <span class="grey">Тип линзы:</span>
                    <span>Прогрессивные</span>
                </li>
                <li>
                    <span class="grey">УФ-защита (nm):</span>
                    <span>355</span>
                </li>
                <li>
                    <span class="grey">Удельный вес (г.см³):</span>
                    <span>1.32</span>
                </li>
                <li>
                    <span class="grey">Цвет остаточного рефлекса:</span>
                    <span>Сиреневый</span>
                </li>
                <li>
                    <span class="grey">ИЧСЛО АББЕ:</span>
                    <span>58</span>
                </li>
            </ul>
        </div>
        <div class="card-tabs__tab" v-if="tabs[3].has" v-show="tabs[3].show">
            <p>Crizal Prevencia – самое совершенное покрытие в линейке покрытий Crizal. Благодаря инновационной технологии Light Scan оно защищает глаза от вредного сине – фиолетового  света, который является причиной ВМД (возрастной молекулярной дегенерации) и пропускает полезный сине – голубой свет, необходимый для функционирования биологических часов человека и его общего хорошего самочувствия. Мультипокрытие сохраняет все преимущества топового покрытия Crizal Forte UV – защищает глаза от УФ – излучения, отраженного от задней поверхности линзы, а линзу – от бликов, царапин, капель воды и пыли.</p>
            <p>Угол смачивания 116°. Пропускание света – 98%.</p>

            <p>Составляющие покрытия Crizal Prevencia:<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Прозрачность линзы и отсутствие бликов;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Антирефлексный слой – защита от бликов;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Грязеотталкивающий слой – защита от пятен и отпечатков;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Абразивный слой – устойчивость к царапинам;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Антистатический слой — защита от пыли;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Водоотталкивающий слой — защита от капель воды;<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;УФ – фильтр – защита от УФ – излучения (в том числе от отраженного УФ – излучения от задней поверхности линзы)<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Технология Light Scan – защита от вредного сине – фиолетового света, пропускание полезного сине – голубого.</p>

            <p>Цвет остаточного рефлекса – сиреневый.</p>
        </div>
        <div class="card-tabs__tab" v-if="tabs[4].has" v-show="tabs[4].show">
            Линза Essilor 1,5 Orma Varilux X Crizal Prevencia - это инновационные полимерные линзы Verilux X Series с топовым мультипокрытием.<br>
            Verilux X - Благодаря инновационной технологии X-tend, которая является ключевой для всех дизайнеров Verilux X, пользователи получают совершенно новые возможности - расширенное зрение в пределах длинны руки с сохранением великолепного зрения вдаль, на среднем расстоянии и вблизи.<br>
            Технология Nanoptix и Synchroneyes, впервые реализованные в дизайнах Varilux S, применяются также в Varilux X, обеспечивая отсутствие "плавающего" эффекта и максимально широкие поля зрения.&nbsp;&nbsp;<br>
            <br>
            •&nbsp;&nbsp;&nbsp;&nbsp;С новой технологией X-tend, линзы существенно снижают поисковые движения головы. Больше не нужно искать правильный уголнаклона головы, чтобы видеть четко.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Материал Orma 1,5 рекомендован для коррекции невысокой степени аметропии до 3,0 D.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Не рекомендован для безободковых оправ при небольших оптических силах.<br>
            •&nbsp;&nbsp;&nbsp;&nbsp;Линзы с мультипокрытием Crizal Prevencia - это первые прозрачные линзы, которые предотвращает долгосрочное повреждение ваших глаз. Защищают от вредного сине-фиолетового света экранов электронных устройств.<br>
            Технология Light Scan, реализованная в покрытии Crizal Prevencia, избирательно фильтрует опасный сине-фиолетовый свет, позволяя полезному сине-голубому свету беспрепятственно проходить через линзу. При этом длительная работа за компьютером не вызывает усталости, и надолго сохраняется здоровье глаз.
        </div>
        <div class="card-tabs__tab no-mob-padding" v-if="tabs[5].has" v-show="tabs[5].show">
            <form @submit.prevent="validateForm('form-question')" data-vv-scope="form-question" ref="form-question">
                <label class="textfield half">
                    <input name="name" type="text" placeholder="Ваше имя">
                </label>
                <label class="textfield half">
                    <input v-validate="'required|email'" name="email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                    <span v-show="errors.has('form-question.email')" class="error">{{ errors.first('form-question.email') }}</span>
                </label>
                <label class="textfield">
                    <textarea name="textarea" cols="30" rows="10" placeholder="Текст вопроса" required></textarea>
                </label>
                <button class="button black submit" type="submit">Отправить</button>
            </form>
        </div>
        <div class="card-tabs__tab no-mob-padding" v-if="tabs[6].has" v-show="tabs[6].show">
            <p v-if="!isLogged">
                Чтобы оставить комментарий,
                <button class="btn-simple" @click="$bvModal.show('auth-modal')">авторизируйтесь</button>.
            </p>
            <form v-else @submit.prevent="validateForm('form-feedback')" data-vv-scope="form-feedback" ref="form-feedback">
                <label class="textfield half">
                    <input name="name" type="text" placeholder="Ваше имя">
                </label>
                <label class="textfield half">
                    <input v-validate="'required|email'" name="email" type="text" data-vv-as="Электронная почта" placeholder="Эл.почта">
                    <span v-show="errors.has('form-feedback.email')" class="error">{{ errors.first('form-feedback.email') }}</span>
                </label>
                <label class="textfield">
                    <textarea name="textarea" cols="30" rows="10" placeholder="Текст комментария" required></textarea>
                </label>
                <button class="button black submit" type="submit">Отправить</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            tabs: {
                1: {
                    show: true,
                    has: true,
                },
                2: {
                    show: false,
                    has: true,
                },
                3: {
                    show: false,
                    has: true,
                },
                4: {
                    show: false,
                    has: true,
                },
                5: {
                    show: false,
                    has: true,
                },
                6: {
                    show: false,
                    has: true,
                },
            },
            tabsOptions: {
                roundLengths: true,
                speed: 500,
                loop: false,
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true,
            },
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/isLogged',
        })
    },
    methods: {
        toggleTab(tabNum) {
            for (let [key, tab] in this.tabs) {
                if (tabNum == key) {
                    this.tabs[key].show = true
                } else {
                    this.tabs[key].show = false
                }
            }
        },
        openComments() {
            for (let key in this.tabs) {
                this.tabs[key].show = false
            }
            this.tabs[6].show = true
        },
        validateForm(scope) {
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                    this.$refs[scope].submit()
                }
            });
        },
    },
    mounted() {
        this.$root.$on('addFeedback', result => { 
            this.openComments();
        })
    },
}
</script>
