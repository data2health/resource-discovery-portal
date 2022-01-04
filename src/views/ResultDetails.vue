<template>
    <div class="h-screen max-w-screen-md m-auto flex justify-center items-start pt-5">
        <Result :item="item"></Result>
    </div>
</template>

<script>
import Result from '../components/ResultWrapper.vue'
import docs from '../store/modules/docs.js'

export default {
    name: "ResultDetails",
    data: function() {
        return {
            item: docs[0]
        }
    },
    props:['result_id'],
    components:{
        Result
    }
}
</script>