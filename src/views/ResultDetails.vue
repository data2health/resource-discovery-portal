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
                <table class="table-auto field-box-table shadow">
                    <tbody>
                        <template v-for="(val, field) in item" :key="field">
                            <FieldBox :content="val" :name="field" :isChild="false" :theme="sourceInfo"></FieldBox>
                        </template>
                    </tbody>
                </table>
            </div>
            <div v-else class="flex justify-center items-center h-screen text-gray-500 text-xl">
                <h1>Nothing to see here...</h1>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { mapGetters } from 'vuex'

import ShareButtons from '../components/ShareButtons.vue'
import FieldBox from '../components/FieldBox.vue'

export default {
    name: "ResultDetails",
    data: function() {
        return {
            item: null
        }
    },
    components:{
        ShareButtons,
        FieldBox
    },
    mounted: function () {
        let self = this;
        axios.get(this.baseURL + '?q=_id:"' + this.$route?.params?.id +'"').then(res=>{
            self.item = res.data.hits[0]
        }).catch(err=>{
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