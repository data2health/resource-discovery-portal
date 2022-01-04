<template>
    <!-- render customized async result component depending on type -->
    <template v-if="item._index.includes('outbreak')">
        <Publication :item="item"></Publication>
    </template>
    <template v-else-if="item._index == 'cd2h-youtube-video'">
        <VideoResult :item="item"></VideoResult>
    </template>
    <template v-else-if="item._index == 'cd2h-youtube-playlist'">
        <PlaylistResult :item="item"></PlaylistResult>
    </template>
    <template v-else-if="item._index == 'cd2h-github-repository'">
        <RepoResult :item="item"></RepoResult>
    </template>
    <template v-else-if="item._index == 'cd2h-clinical-trials'">
        <ClinicalTrial :item="item"></ClinicalTrial>
    </template>
    <template v-else-if="item._index == 'cd2h-datamed'">
        <Dataset :item="item"></Dataset>
    </template>
    <template v-else-if="item._index == 'cd2h-clic-education'">
        <Educational :item="item"></Educational>
    </template>
    <template v-else-if="item._index == 'csbc-pson-computational-tools'">
        <Tool :item="item"></Tool>
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
    loader: () => import('./result_types/OutbreakResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const RepoResult = defineAsyncComponent({
    loader: () => import('./result_types/RepoResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const ClinicalTrial = defineAsyncComponent({
    loader: () => import('./result_types/ClinicalTrial.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Dataset = defineAsyncComponent({
    loader: () => import('./result_types/DatasetResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Educational = defineAsyncComponent({
    loader: () => import('./result_types/EducationalResult.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Tool = defineAsyncComponent({
    loader: () => import('./result_types/CompTool.vue'),
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
        Publication,
        ClinicalTrial ,
        Dataset,
        Educational,
        Tool
    }
}
</script>