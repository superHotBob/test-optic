<template>
    <div>
        <div v-for="pay in paysystem" :key="pay.ID">
            <label>
                <input @change="change" name="PAY_SYSTEM_ID" :checked="pay.CHECKED" type="radio" :value="pay.ID"/>
                <span>{{pay.NAME}}</span>
            </label>
        </div>
    </div>
</template>

<script>

export default {
    props: ['paysystem'],
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    },
}
</script>
