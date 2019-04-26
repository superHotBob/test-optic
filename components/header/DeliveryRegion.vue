<template>
<b-modal class="delivery-region" id="delivery-region" style="color: black;" hide-header hide-footer>
    <button class="modal-close hidden-mobile" @click="$bvModal.hide('delivery-region')"></button>
    <button class="modal-back hidden-desktop" @click="$bvModal.hide('delivery-region'); $bvModal.show('header-menu')"></button>
    <h3>Укажите ваш регион </h3>
    <form>
        <label class="textfield">
            <input type="text" placeholder="Москва" @input="regionFilter" ref="regionInput">
            <button class="textfield__icon" type="button">
                <svg width="15" height="15"><use href="#svg-search"/></svg>
                Поиск
            </button>
        </label>
    </form>
    <ul ref="regionList">
        <li><a href="#0"><span>Астрахань</span></a></li>
        <li><a href="#0"><span>Балашиха</span></a></li>
        <li><a href="#0"><span>Барнаул</span></a></li>
        <li><a href="#0"><span>Брянск</span></a></li>
        <li><a href="#0"><span>Владивосток</span></a></li>
        <li><a href="#0"><span>Волгоград</span></a></li>
        <li><a href="#0"><span>Воронеж</span></a></li>
        <li><a href="#0"><span>Екатеринбург</span></a></li>
        <li><a href="#0"><span>Иваново</span></a></li>
        <li><a href="#0"><span>Ижевск</span></a></li>
        <li><a href="#0"><span>Иркутск</span></a></li>
        <li><a href="#0"><span>Казань</span></a></li>
        <li><a href="#0"><span>Калининград</span></a></li>
        <li><a href="#0"><span>Кемерово</span></a></li>
        <li><a href="#0"><span>Киров</span></a></li>
        <li><a href="#0"><span>Краснодар</span></a></li>
        <li><a href="#0"><span>Красноярск</span></a></li>
        <li><a href="#0"><span>Курск</span></a></li>
        <li><a href="#0"><span>Липецк</span></a></li>
        <li><a href="#0"><span>Магнитогорск</span></a></li>
        <li><a href="#0"><span>Махачкала</span></a></li>
        <li><a href="#0"><span>Москва</span></a></li>
        <li><a href="#0"><span>Набережные Челны</span></a></li>
        <li><a href="#0"><span>Нижний Новгород</span></a></li>
        <li><a href="#0"><span>Новокузнецк</span></a></li>
        <li><a href="#0"><span>Новосибирск</span></a></li>
        <li><a href="#0"><span>Омск</span></a></li>
        <li><a href="#0"><span>Оренбург</span></a></li>
        <li><a href="#0"><span>Пенза</span></a></li>
        <li><a href="#0"><span>Перьм</span></a></li>
        <li><a href="#0"><span>Ростов-на-Дону</span></a></li>
        <li><a href="#0"><span>Рязань</span></a></li>
        <li><a href="#0"><span>Самара</span></a></li>
        <li><a href="#0"><span>Санкт-Петербург</span></a></li>
        <li><a href="#0"><span>Саратов</span></a></li>
        <li><a href="#0"><span>Севастополь</span></a></li>
        <li><a href="#0"><span>Сочи</span></a></li>
        <li><a href="#0"><span>Ставрополь</span></a></li>
        <li><a href="#0"><span>Тверь</span></a></li>
        <li><a href="#0"><span>Тольятти</span></a></li>
        <li><a href="#0"><span>Томск</span></a></li>
        <li><a href="#0"><span>Тула</span></a></li>
        <li><a href="#0"><span>Тюмень</span></a></li>
        <li><a href="#0"><span>Улан-Удэ</span></a></li>
        <li><a href="#0"><span>Ульяновск</span></a></li>
        <li><a href="#0"><span>Уфа</span></a></li>
        <li><a href="#0"><span>Хабаровск</span></a></li>
        <li><a href="#0"><span>Чебоксары</span></a></li>
        <li><a href="#0"><span>Челябинск</span></a></li>
        <li><a href="#0"><span>Ярославль</span></a></li>
    </ul>
</b-modal>
</template>

<script>
export default {
    methods: {
        regionFilter() {
            let input = this.$refs.regionInput;
            let inputVal = input.value.toLowerCase();
            let list = this.$refs.regionList;
            let li = list.querySelectorAll('li');

            for (let i = 0; i < li.length; i++) {
                let a = li[i].querySelector("a");
                let txtValue = a.textContent || a.innerText;
                if (txtValue.toLowerCase().indexOf(inputVal) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
    }
}
</script>
