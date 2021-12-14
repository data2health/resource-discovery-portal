<template>
    <!-- render customized async result component depending on type -->
    <template v-if="item._index == 'cd2h-youtube-video'">
        <VideoResult :item="item"></VideoResult>
    </template>
    <template v-else>
        <DefaultResult :item="item"></DefaultResult>
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import DefaultResult from './DefaultResult.vue'

// Async component with options
const VideoResult = defineAsyncComponent({
  loader: () => import('./VideoResult.vue'),
  delay: 200,
  errorComponent: DefaultResult
})

export default {
    name: "Result",
    props:{
        item: Object
    },
    components:{
        VideoResult,
        DefaultResult
    }
}
</script>