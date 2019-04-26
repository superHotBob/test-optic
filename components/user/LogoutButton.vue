<template>
    <button class="btn-logout" @click="logout">
        <svg width="15" height="15" fill="#999"><use href="#svg-logout"/></svg>
        Выйти
    </button>
</template>

<script>

import { mapGetters } from 'vuex';

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
.btn-logout {
    padding: 0;
    font-size: 0;
    background-color: transparent;
    border: none;
    border-radius: 0;
    outline: none;
    &:focus {
        outline: none;
    }
    svg {
        transition: fill 150ms;
        fill: #999;
    }
}

@media (min-width: 769px) {
    .btn-logout {
        svg {
            &:hover,
            &:focus {
                fill: #000;
            }
        }
    }
}
</style>
