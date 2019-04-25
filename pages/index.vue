<template>
    <div>
        <h2>Index</h2>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <p>12345</p>
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
</template>

<script>

import Vk from '~/components/user/socservices/Vk.vue'

export default {
    components: {
        Vk
    },
    asyncData() {
        return {
            
        }
    }
}
</script>