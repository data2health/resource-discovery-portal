<template>
    <div class="h-screen pt-5 dark:bg-gray-800 bg-gray-200">
        <div class="max-w-screen-md m-auto flex justify-center items-start">
            <Result :item="item"></Result>
        </div>
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