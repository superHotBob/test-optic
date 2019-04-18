<template>
    <div>
        <div v-for="person in personType" :key="person.ID">
            <label>
                <input @change="change" name="PERSON_TYPE" :checked="person.CHECKED" type="radio" :value="person.ID"/>
                <span>{{person.NAME}}</span>
            </label>
            <input v-if="person.CHECKED" type="hidden" name="PERSON_TYPE_OLD" :value="person.ID">
        </div>
    </div>
</template>

<script>

export default {
    props: ['personType'],
    methods: {
        change() {
            this.$parent.$emit('refresh')
        }
    }
}
</script>

