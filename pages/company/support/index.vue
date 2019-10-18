<template>
<div>
  <div class="content-header">
      <div class="main-container">
          <h2>Центр поддержки</h2>
          <ul class="breadcrumbs">
              <li><nuxt-link to="/">Главная</nuxt-link></li>
          </ul>
      </div>
  </div>
  <div class="support main-container custom-page">
    <div class="site-container">
      <div class="wrapper">
        <div class="size_p">
          <p>С радостью ответим на все ваши вопросы и поможем выбрать лучшее!</p>
        </div>
        <div>
          <h4 class="text-title-h1 big-text-bold">
            <span style="font-size: 12pt;">УДОБНЫЕ СПОСОБЫ СВЯЗАТЬСЯ С НАМИ</span>
          </h4>
          <ul class="center-li square">
            <li>Позвонить по номеру +7 (499) 391-19-41</li>
            <li>
              Написать на почту
              <a href="mailto:info@home-optic.ru">info@home-optic.ru</a>
            </li>
            <li>
              <a href>Обратиться в чат</a>
            </li>
          </ul>
        </div>
      </div>
      <br>
    </div>
  </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: 'Центр поддержки'
        }
    }
}
</script>
