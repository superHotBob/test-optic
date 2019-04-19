<template>
    <div>
        <div v-for="deliver in delivery" :key="deliver.ID">
            <label>
                <input @change="change" :checked="deliver.CHECKED" name="DELIVERY_ID" type="radio" :value="deliver.ID"/>
                <span>{{deliver.NAME}}</span>
            </label>
        </div>
    </div>
</template>

<script>

export default {
    props: ['delivery'],
    methods: {
        change() {
            this.$root.$emit('refresh')
        }
    }
}
</script>
