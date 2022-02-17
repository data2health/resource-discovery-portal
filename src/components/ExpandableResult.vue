<template>
    <!-- Type -->
    <ResultTab :name="item?.['@type']" :theme="theme"></ResultTab>
    <div :key="uniqueID" class="min-w-full flex justify-between border-2 border-gray-200 dark:border-gray-500 mb-5 shadow-lg p-3 bg-gray-100 dark:bg-gray-600">
        <div class="w-full">
            <h1 class="text-lg font-bold cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                {{title}} <i class="fas text-gray-500 dark:text-tertiary-light" :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
            </h1>
            <template v-if="open || expandedView">
                <div class="flex justify-start items-center p-2 flex-wrap">
                    <a v-if="item?.url" :href="item?.url" 
                        target="_blank" rel="noopener" 
                        class="bg-tertiary !text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm m-1">
                        source <i class="fas fa-external-link-square-alt"></i>
                    </a>
                    <div class="bg-tertiary !text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm m-1">
                        <PopUpPreview :content="item" name="metadata" :theme="theme"></PopUpPreview>  <i class="fas fa-newspaper"></i>
                    </div>
                    <a :href="'mailto:?subject=Resource%20Discovery%20Portal&amp;body='" 
                        target="_self" rel="noopener" aria-label="E-Mail" 
                        class="bg-tertiary !text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm m-1">
                        e-mail <i class="fas fa-envelope"></i>
                    </a>
                    <router-link class="bg-green-500 !text-white rounded-full px-3 py-1 cursor-pointer hover:bg-green-400 text-sm m-1" 
                    :to="{ path: '/resource/' + item?.['@type'] + '/' + item._id }">more info</router-link>
                </div>
            </template>
            <div class="flex space-x-2 flex-wrap justify-start my-2">
                <!-- badges -->
                <template v-for="(badge, i) in badges" :key="i">
                    <template v-for="(text, field) in badge" :key="text">
                        <div class="banner-clip pr-3 pl-5 py-1 text-xs m-1" :class="theme.bg" v-if="text">
                            <router-link :to="{ path: '/search', query: { 'q':  field + ':' + text}}" class="!text-white hover:!text-tertiary-light">
                                {{text}}
                            </router-link>
                        </div>
                    </template>
                </template>
            </div>
            <div v-if="open || expandedView" class="bg-gray-200 dark:bg-gray-700 p-1">
                <div class="flex justify-around space-x-2">
                    <!-- created date -->
                    <span v-if="created" class="text-sm">
                        <i class="fas fa-book" :class="theme.text"></i> created <b>{{$filters.formatDate(created)}}</b>
                    </span>
                    <!-- updated date -->
                    <span v-if="updated" class="text-sm">
                        <i class="fas fa-clock" :class="theme.text"></i> updated <b>{{$filters.formatDate(updated)}}</b>
                    </span>
                </div>
                <template v-for="(item, field) in viewable_fields" :key="field">
                    <FieldBox :content="item" :name="field" :isChild="false" :theme="theme"></FieldBox>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import FieldBox from './FieldBox.vue'
import ResultTab from './ResultTab.vue'
import PopUpPreview from '../components/PopUpPreview.vue'

export default {
    name: "ExpandableResult",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            open: false,
        }
    },
    props:{
        item: Object
    },
    components:{
        FieldBox,
        ResultTab,
        PopUpPreview
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        badges: function () {
            let matches = [];

            let possibleFields = {
                "Publication": ['topicCategory'],
                "Dataset": ['keywords'],
                "ClinicalTrial": ['keywords', 'healthCondition'],
                "Protocol": ['protocolCategory', 'protocolSetting']
            }

            if (this.item?.['@type'] in possibleFields) {
                possibleFields[this.item['@type']].forEach((field) => {
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
        theme: function() {
            return this.$store.getters.getTheme(this.item?.['@type']);
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
        }
    }
}
</script>