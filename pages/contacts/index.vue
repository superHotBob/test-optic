<template>
  <div>
    <div class="content-header">
      <div class="main-container">
        <h2>Контакты</h2>
        <ul class="breadcrumbs">
          <li>
            <nuxt-link to="/">Главная</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="custom-page main-container contacts">
      <div class="contacts-row">
        <div class="contacts-col--info">
          <div class="contacts__item">
            <h4>Адрес офиса</h4>
            <p></p>
            <address>Россия, Москва, 117556, Варшавское шоссе, д.79, к.2, оф.211</address>
            <p></p>
          </div>
        </div>
        <div class="contacts-col--info">
          <div class="contacts__item">
            <h4>Режим работы</h4>
            <span>
              Пн-Сб 10:00 – 20:00,
              <br />Вс – выходной
            </span>
          </div>
        </div>
        <div class="contacts-col--info">
          <div class="contacts__item">
            <h4>Телефоны</h4>
            <a href="tel:8 (800) 444-34-88">
              <span class="callibri_phone">8 (800) 444-34-88</span>
            </a><br />
            <a href="tel:+7 (499) 391-19-41">
              <span class="callibri_phone">+7 (499) 391-19-41</span>
            </a>

          </div>
        </div>
        <div class="contacts-col--info">
          <div class="contacts__item">
            <h4>Эл. почта</h4>
            <a href="info@home-optic.ru">info@home-optic.ru</a>
          </div>
        </div>
      </div>
      <div class="contacts-row">
        <div class="contacts__map">
          <script
            type="text/javascript"
            charset="utf-8"
            async
            src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A451e4485a408d5717630fc8c1f18e6f999490d4036149f7717193d725d65edd1&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true"
          ></script>
        </div>
        <div class="contacts__requisites">
          <div class="legal_data">
            <p>
              <b>Организация</b>: ИП Скрипник Антон Михайлович
            </p>
            <p>
              <b>Город</b>: Москва
            </p>
            <p>
              <b>ИНН</b>: 772409049130
            </p>
            <p>
              <b>ОГРН</b>: 317774600399318
            </p>
            <p>
              <b>Банк</b>: Московский филиал АО КБ "МОДУЛЬБАНК"
            </p>
            <p>
              <b>Расчетный счет</b>: 40802810570010037302
            </p>
            <p>
              <b>Корреспондентский счет</b>: 30101810645250000092
            </p>
            <p>
              <b>БИК</b>: 044525092
            </p>
          </div>
          <p>
            <span class="span-bold">
              <b>Перед приездом, пожалуйста, оповестите нас по номеру +7 (499) 391-19-41</b>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.contacts {
  &-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  &-col--info {
      width: 23%;
      &:last-child{
          margin-right: 0;
      }
  }
  &__map{
      width: 50%;
      max-width: 546px;
  }
  &__requisites{
      width: 50%;
      margin-top: 40px;
      margin-left: 20px;
  }
}
@media(max-width: 768px){
    .contacts{
        &-row{
            flex-direction: column;
            align-items: center;
        }
        &-col--info{
            width: 100%;
            text-align: center;
            margin-right: 0;
            margin-bottom: 20px;
        }
        &__map{
            width: 100%;
            max-width: 100%;
        }
        &__requisites{
            width: 100%;
            text-align: center;
            margin-left: 0;
        }
    }
}
</style>
