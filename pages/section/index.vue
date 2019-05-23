<template>
    <div>
        <nuxt-child></nuxt-child>
        <div class="main-container section-item-slider">
            <item-slider items="recommended"/>
        </div>
    </div>
</template>

<script>

import ItemSlider from '~/components/sliders/ItemSlider.vue'

export default {
    transition: 'fade',
    components: {
        ItemSlider,
    },
}
</script>

<style lang="scss">
.section-item-slider {
    margin-top: 90px;
}
@media (max-width: 768px) {
    .section-item-slider {
        margin-top: 45px;
    }
}
</style>
