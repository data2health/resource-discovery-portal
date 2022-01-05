<template>
    <div :key="uniqueID" class="min-w-full">
        <!-- render customized async result component depending on type -->
        <template v-if="item._index.includes('outbreak')">
            <Outbreak :item="item" :fullView="fullView"></Outbreak>
        </template>
        <template v-else-if="item._index == 'cd2h-youtube-video'">
            <VideoResult :item="item" :fullView="fullView"></VideoResult>
        </template>
        <template v-else-if="item._index == 'cd2h-youtube-playlist'">
            <PlaylistResult :item="item" :fullView="fullView"></PlaylistResult>
        </template>
        <template v-else-if="item._index == 'cd2h-github-repository'">
            <RepoResult :item="item" :fullView="fullView"></RepoResult>
        </template>
        <template v-else-if="item._index == 'cd2h-clinical-trials'">
            <ClinicalTrial :item="item" :fullView="fullView"></ClinicalTrial>
        </template>
        <template v-else-if="item._index == 'cd2h-datamed'">
            <Dataset :item="item" :fullView="fullView"></Dataset>
        </template>
        <template v-else-if="item._index == 'cd2h-clic-education'">
            <Educational :item="item" :fullView="fullView"></Educational>
        </template>
        <template v-else-if="item._index == 'cd2h-diamond-training-material'">
            <Educational :item="item" :fullView="fullView"></Educational>
        </template>
        <template v-else-if="item._index == 'csbc-pson-computational-tools'">
            <Tool :item="item" :fullView="fullView"></Tool>
        </template>
        <template v-else-if="item._index == 'cd2h-github-user'">
            <Person :item="item" :fullView="fullView"></Person>
        </template>
        <template v-else>
            <DefaultResult :item="item" :fullView="fullView"></DefaultResult>
        </template>
    </div>
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

const Outbreak = defineAsyncComponent({
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

const Person = defineAsyncComponent({
    loader: () => import('./result_types/Person.vue'),
    delay: 200,
    errorComponent: DefaultResult
})


export default {
    name: "Result",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000
        }
    },
    props:{
        item: Object
    },
    components:{
        VideoResult,
        DefaultResult,
        RepoResult,
        PlaylistResult,
        Outbreak,
        ClinicalTrial ,
        Dataset,
        Educational,
        Tool,
        Person
    },
    computed:{
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        }
    }
}
</script>