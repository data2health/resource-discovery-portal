<template>
    <div class="min-h-screen pt-5 dark:bg-gray-800 bg-gray-200">
        <div class="max-w-screen-lg m-auto flex justify-center items-start w-full">
            <div v-if="item">
                <div class="flex justify-end">
                    <ShareButtons></ShareButtons>
                </div>
                <Result :item="item"></Result>
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

import Result from '../components/ResultWrapper.vue'
import ShareButtons from '../components/ShareButtons.vue'

export default {
    name: "ResultDetails",
    data: function() {
        return {
            item: null
        }
    },
    components:{
        Result,
        ShareButtons
    },
    mounted: function () {
        let self = this;
        axios.get(this.baseURL + '?q=_id:"' + this.$route.query?.resource +'"').then(res=>{
            self.item = res.data.hits[0]
            console.log({...self.item})
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
        }
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
    }
}
</script>