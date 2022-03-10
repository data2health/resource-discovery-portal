<template>
    <div class="text-left">
        <!-- Type -->
        <ResultTab :name="result_type" :theme="theme" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{item._source.label}}</router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <Description :text="item?._source?.description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center flex-wrap">

                <div v-if="videoThumbnail && videoPlayer">
                    <div v-if="!videoView">
                        <Popper content="Play Video" class="tip" :hover="true" placement="left" arrow>
                            <img @click="videoView = !videoView" :src="videoThumbnail.url" alt="video thumbnail" class="w-1/3 hover:border hover:border-red-500 hover:cursor-pointer">
                        </Popper>
                    </div>
                    <div v-else>
                        <div v-html="videoPlayer"></div>
                    </div>
                </div>
                <div v-else-if="videoThumbnail && !videoPlayer">
                    <img :src="videoThumbnail.url" alt="video thumbnail" class="w-1/3 hover:border hover:border-red-500">
                    <template v-if="item?._source?.url">
                        <a :href="item._source.url" target="_blank" rel="nonreferrer">
                            <i class="fab fa-youtube-square" :class="theme.text"></i> View Video <i class="fas fa-external-link-alt"></i>
                        </a>
                    </template>
                </div>
                <div v-else>
                    <h1>No Video Preview Available</h1>
                </div>
                <template v-if="expandedView || fullView" data-aos="fade-in">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <p class="mb-1"><i class="far fa-clock" :class="theme.text"></i> {{item?._source?.duration}}</p>
                        <p class="mb-1"><i class="fas fa-thumbs-up" :class="theme.text"></i> {{item?._source?.like_count}}</p>
                        <p class="mb-1"><i class="fas fa-eye" :class="theme.text"></i> {{item?._source?.view_count}}</p>
                    </div>
                </template>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <div v-if="item?._source?.tag">
                    <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in item?._source?.tag" :key="tag + i">
                        <i class="fas fa-tag" :class="theme.text"></i> {{tag?.tag}}
                    </small>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Description from '../ExpandableDescription.vue'
import ResultTab from '../ResultTab.vue'

export default {
    name: "VideoResult",
    data: function() {
        return {
            videoView: false,
        }
    },
    mounted: function () {
        this.videoView = this.fullView ? true : false;
    },
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        Description,
        ResultTab
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['resourceTypeName'] ? this.item?._source?.['resourceTypeName'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
        videoThumbnail: function(){
            if(this.item?._source?.video_thumbnail){
                try {
                    return this.item._source.video_thumbnail.find(thumbnail => {
                    if (thumbnail.size == 'medium') {
                        return true;
                    }
                });
                } catch (e) {
                    console.log(e)
                    return false
                }
            }else{
                return false
            }
        },
        videoPlayer: function(){
            if(this.item?._source?.player){
                return this.item._source.player
            }else{
                return false
            }
        }
    }
}
</script>