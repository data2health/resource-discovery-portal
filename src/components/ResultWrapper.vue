<template>
    <div :key="uniqueID" class="group dark:text-gray-200">
        <ResultTab :name="item?.['resourceTypeName']" :theme="theme" ></ResultTab>
        <div class="border border-t-gray-300 dark:border-gray-700 border-t-2 p-1 w-full bg-white dark:bg-gray-600">
            <div class="h-auto p-4 tracking-wide rounded-sm relative">
                <h1 class="font-bold cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                    {{title}}
                </h1>
            </div>
            <div v-if="open || fullView || expandedView" class="flex justify-center md:justify-start items-center p-2 flex-wrap">
                <a v-if="item?.url" :href="item?.url" 
                    target="_blank" rel="noopener" 
                    class="bg-gray-200 dark:bg-gray-500 rounded-full px-3 py-1 cursor-pointer hover:bg-accent-light text-sm m-1">
                    source <i class="fas fa-external-link-square-alt"></i>
                </a>
                <div class="bg-gray-200 dark:bg-gray-500 rounded-full px-3 py-1 cursor-pointer hover:bg-accent-light text-sm m-1">
                    <PopUpPreview :content="item" name="metadata" :theme="theme"></PopUpPreview>
                </div>
                <a :href="'mailto:?subject=Resource%20Discovery%20Portal&amp;body=Check this out: http://rdp.biothings.io/resources/' + item?.['resourceTypeName'] + '/' + item._id" 
                    target="_self" rel="noopener" aria-label="E-Mail" 
                    class="bg-gray-200 dark:bg-gray-500  rounded-full px-3 py-1 cursor-pointer hover:bg-accent-light text-sm m-1">
                    share <i class="fas fa-envelope"></i>
                </a>
                <router-link v-if="!fullView" 
                class="bg-green-500 !text-white rounded-full px-3 py-1 text-center
                cursor-pointer hover:bg-green-400 text-sm m-4 md:m-1 md:ml-8 w-3/4 md:w-auto" 
                :to="{ path: '/resources/' + item?.['resourceTypeName'] + '/' + item._id }">more info <i class="fas fa-arrow-alt-circle-right"></i></router-link>
            </div>
            <!-- always open -->
            <div class="flex flex-wrap justify-start">
                <!-- badges -->
                <template v-for="(badge, i) in badges" :key="i">
                    <template v-for="(text, field) in badge" :key="text">
                        <div class="px-2 py-1 m-1 hover:bg-accent rounded-sm text-xs" :class="theme.bg" v-if="text">
                            <router-link :to='{ path: "/search", query: { "q":  field + `:"` + text + `"`}}' class="!text-white">
                                {{text}}
                            </router-link>
                        </div>
                    </template>
                </template>
            </div>
            <div v-if="open || fullView || expandedView" class="p-2">
                <div class="flex justify-around mt-1 p-3 dark:text-white">
                    <!-- created date -->
                    <span v-if="created" class="text-sm">
                        <i class="fas fa-book" :class="theme.text"></i> created <b>{{$filters.formatDate(created)}}</b>
                    </span>
                    <!-- updated date -->
                    <span v-if="updated" class="text-sm">
                        <i class="fas fa-clock" :class="theme.text"></i> updated <b>{{$filters.formatDate(updated)}}</b>
                    </span>
                </div>
                <div class="p-1">
                    <Description :text="description" :expanded="fullView ? true: false"></Description>
                </div>
                <template v-if="fullView">
                    <!-- render customized async result component depending on type -->
                    <template v-if="item?.['resourceTypeName'] == 'Publication'">
                        <Publication :item="item" :theme="theme"></Publication>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Protocol'">
                        <Protocol :item="item" :theme="theme"></Protocol>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Video'">
                        <VideoResult :item="item" :theme="theme"></VideoResult>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Playlist'">
                        <PlaylistResult :item="item" :theme="theme"></PlaylistResult>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Repository'">
                        <RepoResult :item="item" :theme="theme"></RepoResult>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'ClinicalTrial'">
                        <ClinicalTrial :item="item" :theme="theme"></ClinicalTrial>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Dataset'">
                        <Dataset :item="item" :theme="theme"></Dataset>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Education'">
                        <Educational :item="item" :theme="theme"></Educational>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Educational'">
                        <Educational :item="item" :theme="theme"></Educational>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'ComputationalTool'">
                        <Tool :item="item" :theme="theme"></Tool>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Person'">
                        <Person :item="item" :theme="theme"></Person>
                    </template>
                    <template v-else>
                        <DefaultResult :item="item" :theme="theme"></DefaultResult>
                    </template>
                </template>
            </div>
        </div>
        <div v-if="!fullView" class="w-full p-1 flex justify-center cursor-pointer bg-gray-100 rounded-b-xl dark:bg-gray-700 mb-2" @click.prevent="open = !open">
            <i class="fas group-hover:animate-bounce" :class="[open ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

import ResultTab from './ResultTab.vue'
import DefaultResult from './result_types/DefaultResult.vue'
import Description from './ExpandableDescription.vue'
import PopUpPreview from './PopUpPreview.vue'

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
    loader: () => import('./result_types/Publication.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Protocol = defineAsyncComponent({
    loader: () => import('./result_types/Protocol.vue'),
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
    loader: () => import('./result_types/Dataset.vue'),
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
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            open: false
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
        Publication,
        ClinicalTrial ,
        Dataset,
        Educational,
        Tool,
        Person,
        ResultTab,
        Description,
        PopUpPreview,
        Protocol
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        },
        theme: function() {
            return this.$store.getters.getTheme(this.item?.["resourceTypeName"]);
        },
        title: function () {
            let possibleFields = ['title', 'name', 'label', 'toolName', 'article_title'];

            let match =  possibleFields.find( field => {
                if (field in this.item && this.item[field] !== null) {
                    return true
                }
            });
            //match is string
            if (typeof this.item[match] == 'string') {
                return this.item[match];
            }
            // match was nested in object eg. article.title['article_title']
            else if (typeof this.item[match] == 'object') {
                for (const key in this.item[match]) {
                    if (typeof this.item[match][key] == 'string') {
                        return this.item[match][key];
                    }
                }
            }
        },
        description: function (){
            return this.item?.description ? this.item?.description :
            this.item?.abstract ? this.item?.abstract :
            this.item?.purpose ? this.item?.purpose : '';
        },
        created: function () {
            let possibleFields = ['date_created', 'dateCreated', 'datePublished'];

            let match =  possibleFields.find( field => {
                if (field in this.item && this.item[field] !== null) {
                    return true
                }
            });
            //match is string
            if (typeof this.item[match] == 'string') {
                return this.item[match];
            }
            // match was nested in object eg. article.title['article_title']
            else if (typeof this.item[match] == 'object') {
                for (const key in this.item[match]) {
                    if (typeof this.item[match][key] == 'string') {
                        return this.item[match][key];
                    }
                }
            }
        },
        updated: function () {
            let possibleFields = ['date_updated', 'dateUpdated', 'dateModified', 'date'];

            let match =  possibleFields.find( field => {
                if (field in this.item && this.item[field] !== null) {
                    return true
                }
            });
            //match is string
            if (typeof this.item[match] == 'string') {
                return this.item[match];
            }
            // match was nested in object eg. article.title['article_title']
            else if (typeof this.item[match] == 'object') {
                for (const key in this.item[match]) {
                    if (typeof this.item[match][key] == 'string') {
                        return this.item[match][key];
                    }
                }
            }
        },
        viewable_fields: function(){
            let allowed = ['description', 'id', 'keywords', 'tags',
            'player', 'published', 'created', 'author', 'abstract', 'url', 'curatedBy', 'doi', 'abstract'];
            let res = {};
            allowed.forEach(field => {
                if (Object.hasOwnProperty.call(this.item, field)) {
                    res[field] = this.item[field]
                }
            });
            return res;
        },
        badges: function () {
            let matches = [];

            let possibleFields = {
                "Publication": ['topicCategory', 'keywords'],
                "Dataset": ['keywords'],
                "ClinicalTrial": ['keywords', 'healthCondition'],
                "Protocol": ['protocolCategory', 'protocolSetting']
            }

            if (this.item?.['resourceTypeName'] in possibleFields) {
                possibleFields[this.item['resourceTypeName']].forEach((field) => {
                    if (field in this.item) {
                        let match = field;
                        //match is string
                        if (typeof this.item[match] == 'string') {
                            let obj = {}
                            obj[match] = this.item[match]
                            matches.push(obj)
                        }else if (Array.isArray(this.item[match])) {
                            this.item[match].forEach(val => {
                                let obj = {}
                                obj[match] = val
                                matches.push(obj)
                            });
                        }
                        // match was nested in object eg. article.title['article_title']
                        else if (typeof this.item[match] == 'object') {
                            for (const key in this.item[match]) {
                                if (typeof this.item[match][key] == 'string') {
                                    let obj = {}
                                    obj[match] = this.item[match][key]
                                    matches.push(obj)
                                }
                            }
                        }
                    }
                });
            }

            return matches;
        },
    }
}
</script>