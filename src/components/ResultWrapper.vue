<template>
    <div :key="uniqueID" class="group dark:text-gray-200 mb-10">
        <template v-if="showTab">
            <ResultTab :name="item?.['resourceTypeName']" :theme="resourceInfo"></ResultTab>
        </template>
        <div class="border border-t-gray-300 dark:border-gray-700 border-t-2 p-1 w-full bg-white dark:bg-gray-600 rounded-t shadow-lg">
            <div class="h-auto rounded-sm relative p-1">
                <!--🦄 Profiles Only 🦄-->
                <template v-if="item?.['resourceTypeName'] == 'Profile'">
                    <img 
                    :src="item?.raw?.avatar_url || '/assets/img/default_user.jpeg'" 
                    :alt="title" 
                    class="w-16 border-2 border-gray-200 dark:border-white rounded-full mr-3 inline">
                    <p class="inline cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                        {{title}} <span title="Repository" class="text-accent text-sm" v-if="item?.url?.includes('github')">(<i class="fab fa-github-alt"></i>)</span>
                    </p>
                    <small @click.prevent="open = !open" class="text-gray-400 dark:text-gray-400 cursor-pointer" v-if="item?.raw?.company"> | {{item?.raw?.company}}</small>
                    <p class=" mt-1">{{item?.raw?.bio}}</p>
                </template>
                <!--🦄 Institution Only 🦄-->
                <template v-if="item?.['resourceTypeName'] == 'Institution'">
                    <p class="inline cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                        {{title}} <span title="Repository" class="text-accent text-sm" v-if="item?.url?.includes('github')">(<i class="fab fa-github-alt"></i>)</span>
                    </p>
                </template>
                <!--🦄 Playlist Only 🦄-->
                <template v-else-if="item?.['resourceTypeName'] == 'Playlist'">
                    <p class="cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                        {{title}} <b class="text-xs" :class="item?.video?.length ? 'text-red-500 dark:text-red-300': 'text-gray-400'">({{item?.video?.length || 0 }}) videos</b>
                    </p>
                </template>
                <!--🦄 All others 🦄-->
                <p v-else class="cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                    {{title}}
                </p>
                <!--🦄 Video Only 🦄-->
                <div v-if="item?.['resourceTypeName'] == 'Video' && !fullView" class="space-x-3">
                    <div v-if="videoThumbnail && videoPlayer" class="w-32 inline">
                        <img v-if="!videoView" @click="videoView = !videoView" :src="videoThumbnail.url" alt="video thumbnail" class="w-32 !mr-0 hover:shadow hover:cursor-pointer">
                        <div v-else class="flex justify-center" v-html="videoPlayer"></div>
                        <span v-if="item?.duration" class=" inline">
                            <i class="fas fa-clock" :class="resourceInfo.text"></i> <b>{{item?.duration}}</b>
                        </span>
                    </div>
                    
                </div>
            </div>
            <div v-if="open || fullView || expandedView" class="flex justify-center md:justify-start items-center p-2 flex-wrap text-sm">
                <Popper content="Source" class="tip" :hover="true" placement="top">
                    <a v-if="item?.url" :href="item?.url" 
                        target="_blank" rel="noopener" 
                        class="bg-gray-200 dark:bg-gray-500 rounded-full px-2 py-1 cursor-pointer hover:bg-accent-light  m-1">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </Popper>
                <Popper content="Share" class="tip" :hover="true" placement="top">
                    <a :href="'mailto:?subject=Resource%20Discovery%20Portal&amp;body=Check this out: http://rdp.biothings.io/resources/' + item?.['resourceTypeName'] + '/' + item._id" 
                        target="_self" rel="noopener" aria-label="E-Mail" 
                        class="bg-gray-200 dark:bg-gray-500  rounded-full px-2 py-1 cursor-pointer hover:bg-accent-light  m-1">
                        <i class="fas fa-envelope"></i>
                    </a>
                </Popper>
                <div class="bg-gray-200 dark:bg-gray-500 rounded-full px-3 py-1 hover:bg-accent-light cursor-context-menu m-1">
                    <PopUpPreview :content="item" name="metadata" :theme="resourceInfo"></PopUpPreview>
                </div>
                <router-link v-if="!fullView" 
                class="bg-green-500 !text-white rounded-full px-3 py-1 text-center
                cursor-pointer hover:bg-green-400  m-4 md:m-1 md:ml-8 w-3/4 md:w-auto" 
                :to="{ path: '/resources/' + item?.['resourceTypeName'] + '/' + item._id }">more info <i class="fas fa-arrow-alt-circle-right"></i></router-link>
                <div class="p-1 w-full">
                    Description: <Description v-for="description, i in descriptions" :key="i + 'desc'" :text="description" :expanded="fullView ? true: false" :copy="false"></Description>
                </div>
            </div>
            <!-- Preview badges -->
            <div class="flex flex-wrap justify-start">
                <!-- badges -->
                <template v-for="(badge, i) in preview_badges" :key="i">
                    <template v-for="(text, field) in badge" :key="text">
                        <div class="px-2 py-1 m-1 hover:bg-accent rounded-md text-xs" :class="resourceInfo.bg2" v-if="text">
                            <router-link :to='{ path: "/search", query: { "q":  field + `:"` + text + `"`}}' class="!text-gray-700 dark:!text-white hover:!text-white">
                                <i v-if="text == 'Mac'" class="fab fa-apple mr-1"></i>
                                <i v-else-if="text == 'Windows'" class="fab fa-windows mr-1"></i>
                                <i v-else-if="text == 'Linux'" class="fab fa-linux mr-1"></i>
                                <i v-else-if="text == 'Python'" class="fab fa-python mr-1"></i>
                                {{text}}
                            </router-link>
                        </div>
                    </template>
                </template>
            </div>
            <div v-if="open || fullView || expandedView" class="p-2">
                <div class="flex justify-around mt-1 p-3 dark:text-white text-sm">
                    <!-- created date -->
                    <span v-if="created" class="">
                        <i class="fas fa-book" :class="resourceInfo.text"></i> created <b>{{$filters.formatDate(created)}}</b>
                    </span>
                    <!-- updated date -->
                    <span v-if="updated" class="">
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
                    <template v-else-if="item?.['resourceTypeName'] == 'Profile'">
                        <Person :item="item" :theme="resourceInfo"></Person>
                    </template>
                    <template v-else-if="item?.['resourceTypeName'] == 'Institution'">
                        <Institution :item="item" :theme="resourceInfo"></Institution>
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
                    <template v-else-if="item?.['resourceTypeName'] == 'Video'">
                        <Video :item="item" :theme="resourceInfo"></Video>
                    </template>
                    <template v-else>
                        <DefaultResult :item="item" :theme="resourceInfo"></DefaultResult>
                    </template>
                </template>
            </div>
        </div>
        <div v-if="!fullView" class="w-full p-1 flex justify-center cursor-pointer bg-gray-200 rounded-b dark:bg-gray-700 mb-2 shadow-lg" @click.prevent="open = !open">
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

const Institution = defineAsyncComponent({
    loader: () => import('./result_types/Institution.vue'),
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

const Video = defineAsyncComponent({
    loader: () => import('./result_types/Video.vue'),
    delay: 200,
    errorComponent: DefaultResult
})


export default {
    name: "Result",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            open: false,
            videoView: false,
        }
    },
    props:{
        item: Object,
        showTab: {
            'type': Boolean,
            'default': true
        }
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
        Instrument,
        Video,
        Institution
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
            let possibleFields = ['name','title', 'label', 'toolName', 'article_title'];

            let match =  possibleFields.find( field => {
                if (field in this.item) {
                    return true
                }
            });
            if (this.item[match] == null || this.item[match] == '') {
                return this.item?.['resourceTypeName'] + ' title unavailable.'
            }
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
        descriptions: function (){
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
            let match = null;
            let possible_fields = ['project_abstract.abstract_text', 'description', 'abstract', 'purpose'];

            for (let i = 0; i < possible_fields.length; i++) {
                const field = possible_fields[i];
                if (field.includes('.') && checkStringPath(this.item, field)) {
                    match = checkStringPath(this.item, field);
                    break; 
                }if (Object.hasOwnProperty.call(this.item, field)) {
                    match = this.item[field];
                    break; 
                }
            }

            if (match) {
                if (
                    typeof match === 'object' &&
                    !Array.isArray(match) &&
                    match !== null
                ){
                    return Object.entries(match);
                }
                else if (Array.isArray(match)) {
                    //check if not empty
                    if(match?.length){
                        
                        return match.map((value) => {
                            if (Object.keys(value)?.length) {
                                return Object.values(value).join(' 📗 ')
                            }else{
                                return value
                            }
                        });
                    }
                    return match;
                }else{
                    return [match]
                }
            }
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
        videoThumbnail: function(){
            if (this.item?.video_thumbnail) {
                let prefs = ['standard', 'default', 'high'];
                for (let i = 0; i < prefs.length; i++) {
                    if (this.item?.video_thumbnail.find(thumbnail => thumbnail.size == prefs[i])) {
                        return this.item?.video_thumbnail.find(thumbnail => thumbnail.size == prefs[i]);
                    }
                }
            }
        },
        videoPlayer: function(){
            return this.item?.player
        }
    }
}
</script>