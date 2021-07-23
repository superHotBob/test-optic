<template>
<div>
    <Subscribe  
        :subscriber="subscriber"
    />
</div>   

</template>

<script>


import Subscribe from '~/components/personal/Subscribe.vue'

export default {
    middleware: 'auth',
    components: {
        Subscribe
    },
    async asyncData({ store, $axios, error }) {
        let response = await $axios.get('/api/v1/subscribe/')
        //console.log('checking', response.data);
        return {
            subscriber: response.data
        }
    //     .then(response => {
            
    //     }).catch((e) => {
    //                 console.log('asdasd');
    //         if (e.response.status === 404) {
    //             error({ statusCode: 404, message: e.message })
    //         }
    //     })
    }
}
</script>
