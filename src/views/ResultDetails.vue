<template>
    <div class="min-h-screen pt-5 dark:bg-gray-800 w-full bg-gray-200">
        <div class="max-w-screen-lg m-auto flex justify-center items-start container">
            <div v-if="item" class="w-full">
                <div class="flex justify-end w-full p-2">
                    <Popper content="Download Metadata" class="tip" :hover="true" placement="top">
                        <button @click="download" 
                        class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                            <i class="fas fa-download text-white"></i>
                        </button>
                    </Popper>
                    <ShareButtons></ShareButtons>
                </div>
                <div>
                    <Result :item="item"></Result>
                </div>
                <template v-if="item?.url">
                    <teleport to="head">
                        <link rel="canonical" :href="item.url">
                    </teleport>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { mapGetters } from 'vuex'

import ShareButtons from '../components/ShareButtons.vue'
import Result from '../components/ResultWrapper.vue'

export default {
    name: "ResultDetails",
    data: function() {
        return {
            item: null
        }
    },
    components:{
        ShareButtons,
        Result
    },
    mounted: function () {
        let self = this;
        if (this.$route?.params?.id) {
            axios.get(this.baseURL + '?q=_id:"' + this.$route?.params?.id +'"' + " AND resourceTypeName:" + this.$route?.params?.resource).then(res=>{
            self.item = res.data.hits[0];
            console.log(res.data.hits[0])
            // schema.org compliant docs
            if (self.item?.['@type']) {
                self.embedMetadata();
            }
        }).catch(err=>{
            self.$toast.error(`Failed to load metadata`);
            console.log(err)
        });
        }
    },
    computed:{
        ...mapGetters([
            'baseURL'
        ]),
    },
    methods:{
        embedMetadata() {
            let scriptTag = document.createElement('script');
            let obj = Object.assign({},this.item);
            obj['@context'] = "http://schema.org/";
            let str = JSON.stringify(obj, null, 2);
            scriptTag.setAttribute('type',"application/ld+json");
            scriptTag.text= str;
            document.head.appendChild(scriptTag);
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