<template>
    <div :key="uniqueID">
        <!-- render customized async result component depending on type -->
        <template v-if="type == 'Publication'">
            <Outbreak :item="item" :fullView="fullView"></Outbreak>
        </template>
        <template v-else-if="type == 'Video'">
            <VideoResult :item="item" :fullView="fullView"></VideoResult>
        </template>
        <template v-else-if="type == 'Playlist'">
            <PlaylistResult :item="item" :fullView="fullView"></PlaylistResult>
        </template>
        <template v-else-if="type == 'Repository'">
            <RepoResult :item="item" :fullView="fullView"></RepoResult>
        </template>
        <template v-else-if="type == 'ClinicalTrial'">
            <ClinicalTrial :item="item" :fullView="fullView"></ClinicalTrial>
        </template>
        <template v-else-if="type == 'Dataset'">
            <Dataset :item="item" :fullView="fullView"></Dataset>
        </template>
        <template v-else-if="type == 'Education'">
            <Educational :item="item" :fullView="fullView"></Educational>
        </template>
        <template v-else-if="type == 'Educational'">
            <Educational :item="item" :fullView="fullView"></Educational>
        </template>
        <template v-else-if="type == 'ComputationalTool'">
            <Tool :item="item" :fullView="fullView"></Tool>
        </template>
        <template v-else-if="type == 'Person'">
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
        },
        type: function(){
            return this.item?.['@type'];
        }
    }
}
</script>