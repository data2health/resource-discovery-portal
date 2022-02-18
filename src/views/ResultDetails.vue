<template>
    <div class="min-h-screen pt-5 dark:bg-gray-800 w-full bg-white">
        <div class="max-w-screen-lg m-auto flex justify-center items-start container">
            <div v-if="item" class="flex flex-wrap">
                <div class="flex justify-end w-full p-2">
                    <Popper content="Download Metadata" class="tip" :hover="true" placement="top">
                        <button @click="download" 
                        class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                            <i class="fas fa-download text-white"></i>
                        </button>
                    </Popper>
                    <ShareButtons></ShareButtons>
                </div>
                <ResultTab :name="item?.['@type']" :theme="sourceInfo"></ResultTab>
                <div class="p-1 md:p-5 bg-gray-100 dark:bg-gray-600 space-y-4 rounded-2xl mb-3">
                    <h1 class="text-lg md:text-3xl text-gray-700 dark:text-white">{{title}}</h1>
                    <div class="flex justify-between items-center text-gray-700 dark:text-white">
                        <span><i class="fas fa-book" :class="sourceInfo.text"></i> {{$filters.formatDate(created)}}</span>
                        <span><i class="fas fa-clock" :class="sourceInfo.text"></i> {{$filters.formatDate(updated)}}</span>
                    </div>
                    <Description :text="description"></Description>
                </div>
                <table class="table-auto field-box-table shadow mb-5">
                    <tbody>
                        <template v-for="(val, field) in item" :key="field">
                            <FieldBox :content="val" :name="field" :isChild="false" :theme="sourceInfo"></FieldBox>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { mapGetters } from 'vuex'

import ShareButtons from '../components/ShareButtons.vue'
import FieldBox from '../components/FieldBox.vue'
import Description from '../components/ExpandableDescription.vue'
import ResultTab from '../components/ResultTab.vue'

export default {
    name: "ResultDetails",
    data: function() {
        return {
            item: null
        }
    },
    components:{
        ShareButtons,
        FieldBox,
        Description,
        ResultTab
    },
    mounted: function () {
        let self = this;
        axios.get(this.baseURL + '?q=_id:"' + this.$route?.params?.id +'"').then(res=>{
            self.item = res.data.hits[0]
        }).catch(err=>{
            self.$toast.error(`Failed to load metadata`);
            console.log(err)
        });
        // schema.org compliant docs
        if (this.embeddableMetadata) {
            this.embedMetadata();
        }
    },
    computed:{
        ...mapGetters([
            'baseURL'
        ]),
        embeddableMetadata: function () {
            return this.item?.['@type'] ? this.item : false;
        },
        sourceInfo: function() {
            return this.$store.getters.getTheme(this.$route?.params?.resource);
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
    },
    methods:{
        embedMetadata() {
            let scriptTag = document.createElement('script');
            let obj = Object.assign({},this.embeddableMetadata);
            obj['@context'] = "http://schema.org/";
            let str = JSON.stringify(obj, null, 2);
            scriptTag.setAttribute('type',"application/ld+json");
            scriptTag.text= str;
            // console.log('embedding json-ld',scriptTag)
            document.body.appendChild(scriptTag);
            this.createCanonicalTag(this.embeddableMetadata);
        },
        createCanonicalTag(meta){
            if (meta?.url) {
                let linkTag = document.createElement('link');
                linkTag.setAttribute('rel',"canonical");
                linkTag.setAttribute('href',meta.url);
                document.head.appendChild(linkTag);
            }
        },
        download() {
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(this.item, null, 2)], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = this.item?.['@type'] + "-" + this.item['_id'] + '.json';
            a.click();
        },
    }
}
</script>