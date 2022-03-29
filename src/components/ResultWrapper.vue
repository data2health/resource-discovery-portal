<template>
    <div :key="uniqueID" class="group dark:text-gray-200">
        <ResultTab :name="item?.['resourceTypeName']" :theme="resourceInfo" ></ResultTab>
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
                    <PopUpPreview :content="item" name="metadata" :theme="resourceInfo"></PopUpPreview>
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
                <div class="p-1 w-full">
                    <Description :text="description" :expanded="fullView ? true: false"></Description>
                </div>
            </div>
            <!-- Preview badges -->
            <div class="flex flex-wrap justify-start">
                <!-- badges -->
                <template v-for="(badge, i) in preview_badges" :key="i">
                    <template v-for="(text, field) in badge" :key="text">
                        <div class="px-2 py-1 m-1 hover:bg-accent rounded-sm text-xs" :class="resourceInfo.bg" v-if="text">
                            <router-link :to='{ path: "/search", query: { "q":  field + `:"` + text + `"`}}' class="!text-white">
                                {{text}}
                            </router-link>
                        </div>
                    </template>
                </template>
            </div>

            <div v-if="open && !fullView" class="flex justify-center items-center">
                <!-- Preview fields -->
                <table class="w-full text-sm my-3">
                    <tbody>
                        <template v-for="info, field in preview_fields" :key="field">
                            <tr class="border border-b-2 border-t-0 border-r-0 border-l-0 border-gray-100 p-1">
                                <td>
                                    <b>{{field}}:</b>
                                </td>
                                <td>
                                    <template v-if="info.includes('http')">
                                        <a :href="info" target="_blank">{{info}}</a>
                                    </template>
                                    <span v-else v-html="info"></span>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div v-if="open || fullView || expandedView" class="p-2">
                <div class="flex justify-around mt-1 p-3 dark:text-white">
                    <!-- created date -->
                    <span v-if="created" class="text-sm">
                        <i class="fas fa-book" :class="resourceInfo.text"></i> created <b>{{$filters.formatDate(created)}}</b>
                    </span>
                    <!-- updated date -->
                    <span v-if="updated" class="text-sm">
                        <i class="fas fa-clock" :class="resourceInfo.text"></i> updated <b>{{$filters.formatDate(updated)}}</b>
                    </span>
                </div>
                <template v-if="fullView">
                    <!-- render customized async result component depending on type -->
                    <template v-if="item?.['resourceTypeName'] == 'Publication'">
                        <Publication :item="item" :theme="resourceInfo"></Publication>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Protocol'">
                        <Protocol :item="item" :theme="resourceInfo"></Protocol>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Other CreativeWork'">
                        <Creative :item="item" :theme="resourceInfo"></Creative>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Multimedia Object'">
                        <Multimedia :item="item" :theme="resourceInfo"></Multimedia>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Playlist'">
                        <PlaylistResult :item="item" :theme="resourceInfo"></PlaylistResult>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Repository'">
                        <RepoResult :item="item" :theme="resourceInfo"></RepoResult>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Clinical Trial'">
                        <ClinicalTrial :item="item" :theme="resourceInfo"></ClinicalTrial>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Dataset'">
                        <Dataset :item="item" :theme="resourceInfo"></Dataset>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Education Resource'">
                        <Educational :item="item" :theme="resourceInfo"></Educational>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Tool'">
                        <Tool :item="item" :theme="resourceInfo"></Tool>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Person'">
                        <Person :item="item" :theme="resourceInfo"></Person>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Funding Opportunity'">
                        <Funding :item="item" :theme="resourceInfo"></Funding>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Grant'">
                        <Grant :item="item" :theme="resourceInfo"></Grant>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Research Instrument'">
                        <Instrument :item="item" :theme="resourceInfo"></Instrument>
                    </template>
                    <template v-else>
                        <DefaultResult :item="item" :theme="resourceInfo"></DefaultResult>
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
const Multimedia = defineAsyncComponent({
    loader: () => import('./result_types/Multimedia.vue'),
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

const Creative = defineAsyncComponent({
    loader: () => import('./result_types/Creative.vue'),
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
    loader: () => import('./result_types/Tool.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Person = defineAsyncComponent({
    loader: () => import('./result_types/Person.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Funding = defineAsyncComponent({
    loader: () => import('./result_types/Funding.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Grant = defineAsyncComponent({
    loader: () => import('./result_types/Grant.vue'),
    delay: 200,
    errorComponent: DefaultResult
})

const Instrument = defineAsyncComponent({
    loader: () => import('./result_types/Instrument.vue'),
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
        Multimedia,
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
        Protocol,
        Creative,
        Funding,
        Grant,
        Instrument
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        },
        resourceInfo: function() {
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
            let checkStringPath = function(o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.');
                for (var i = 0, n = a.length; i < n; ++i) {
                    var k = a[i];
                    if (k in o) {
                        o = o[k];
                    } else {
                        return;
                    }
                }
                return o;
            }
            let match = '';
            let possible_fields = ['project_abstract.abstract_text', 'description', 'abstract', 'purpose'];

            possible_fields.forEach((field) => {
                if (field.includes('.')) {
                    let res = checkStringPath(this.item, field)
                    if (res) {
                        match = res;
                    }
                }else{
                    if (Object.hasOwnProperty.call(this.item, field)) {
                        match = this.item[field];
                    }
                }
            })
            return match;
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
        preview_fields: function(){
            let allowed = ['published', 'created', 'url', 'doi', 'abstract'];
            let res = {};
            allowed.forEach(field => {
                if (Object.hasOwnProperty.call(this.item, field)) {
                    res[field] = this.item[field]
                }
            });
            return res;
        },
        preview_badges: function () {
            let matches = [];
            //specified in search.js mapping
            if (this.resourceInfo?.preview_badges) {
                this.resourceInfo?.preview_badges.forEach((field) => {
                    if (field in this.item) {
                        let match = field;
                        //match is string
                        if (typeof this.item[match] == 'string') {
                            let obj = {}
                            obj[match] = this.item[match]
                            matches.push(obj)
                        }else if (Array.isArray(this.item[match])) {
                            this.item[match].forEach(val => {
                                if (typeof val == 'object') {
                                    for (const key in val) {
                                        if (typeof val[key] == 'string') {
                                            let obj = {}
                                            obj[match] = val[key]
                                            matches.push(obj)
                                        }
                                    }
                                } else {
                                    let obj = {}
                                    obj[match] = val
                                    matches.push(obj)
                                }
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