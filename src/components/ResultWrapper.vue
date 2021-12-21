<template>
    <!-- render customized async result component depending on type -->
    <template v-if="item._index == 'cd2h-youtube-video'">
        <VideoResult :item="item"></VideoResult>
    </template>
    <template v-else-if="item._index == 'cd2h-youtube-playlist'">
        <PlaylistResult :item="item"></PlaylistResult>
    </template>
    <template v-else-if="item._index == 'cd2h-github-repository'">
        <RepoResult :item="item"></RepoResult>
    </template>
    <template v-else-if="item._index == 'outbreak_biorxiv_202110201005_cky5khsd'">
        <Publication :item="item"></Publication>
    </template>
    <template v-else>
        <DefaultResult :item="item"></DefaultResult>
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import DefaultResult from './result_types/DefaultResult.vue'

// Async component with options
const VideoResult = defineAsyncComponent({
    loader: () => import('./result_types/VideoResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const PlaylistResult = defineAsyncComponent({
    loader: () => import('./result_types/PlaylistResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Publication = defineAsyncComponent({
    loader: () => import('./result_types/PublicationResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const RepoResult = defineAsyncComponent({
    loader: () => import('./result_types/RepoResult.vue'),
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
        DefaultResult,
        RepoResult,
        PlaylistResult,
        Publication
    }
}
</script>