<template>
    <!--🦄 Type Specific Content 🦄-->
    <div :class="theme.bg">
        <!-- 🦄 Badges 🦄 -->
        <div class="flex justify-start items-center flex-wrap bg-white dark:bg-gray-700">
            <template v-for="pill in pills" class="" :key="pill.value">
                <!-- pill -->
                <Pill :color="theme['bg']">
                    <template v-slot:title>{{$filters.readableName(pill.field)}}</template>
                    <template v-slot:value>{{pill.value}}</template>
                </Pill>
            </template>
            <Pill :color="theme['bg']">
                <template v-slot:title>Channel</template>
                <template v-slot:value>{{item?.channel?.channel_title}}</template>
            </Pill>
        </div>
        <div class="flex justify-around flex-wrap items-center p-2">
            <!-- 🦄 Video details 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded p-2 flex justify-around items-center space-y-1 m-2">
                <span v-if="item?.published" class="">
                    <i class="fas fa-video" :class="theme.text"></i> Published on <b>{{$filters.formatDate(item?.published)}}</b>
                </span>
            </div>
            <!-- 🦄 Video details 🦄 -->
            <div v-if="item?.video?.length" class="flex justify-start items-start w-full">
                <div class="w-3/4 p-1">
                    <div class="w-full">
                        <h4>({{item?.video?.length}}) Videos</h4>
                    </div>
                    <template v-if="videoSelected">
                        <VideoPreview :theme="theme" :video="videoSelected" :fullView="true"></VideoPreview>
                    </template>
                    <template v-else>
                        <img src='/assets/img/videoPreview.svg' alt="Select a video" class="w-full opacity-25">
                    </template>
                </div>
                <div class="1/4 bg-black/60 max-h-[60vh] overflow-y-scroll">
                    <template v-for="vid in item?.video" :key="vid.video_id">
                        <VideoPreview :theme="theme" :video="vid" :fullView="false"></VideoPreview>
                    </template>
                </div>
            </div>
            <div v-else class="w-full text-center">
                <h3><i class="fas fa-sad-tear"></i> This playlist doesn't have any videos yet.</h3>
            </div>
            <!-- 🦄 Curation 🦄 -->
            <div  v-if="item?.curatedBy" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2">
                <h3 class="font-light  mb-2" :class="theme['text']">Curated by</h3>
                <template v-if="item?.curatedBy?.url">
                    <img v-if="item?.curatedBy?.name == 'ClinicalTrials.gov'" src="/assets/img/ctgov.jpeg" alt="ClinicalTrials.gov" class="w-32">
                    <img v-else-if="item?.curatedBy?.name == 'Figshare'" src="/assets/img/figshare.png" alt="Figshare" class="w-32">
                    <img v-else-if="item?.curatedBy?.name == 'Protocols.io'" src="/assets/img/protocols_io.png" alt="Protocols.io" class="w-32">
                    <a  :href="item?.curatedBy?.url" target="_blank" rel="nonreferrer">
                            {{item?.curatedBy?.name || 'more info'}} <span class="font-bold">({{$filters.formatDate(item?.curatedBy?.curationDate)}})</span> <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                    </a> 
                    <Pill v-if="item?.curatedBy?.versionDate" :color="theme['bg']">
                        <template v-slot:title>version</template>
                        <template v-slot:value>{{$filters.formatDate(item?.curatedBy?.versionDate)}}</template>
                    </Pill>
                </template>
                <p v-else>{{item?.curatedBy?.name}} ({{$filters.formatDate(item?.curatedBy?.curationDate)}})</p>
            </div>
        </div>
        <div v-if="item?.keywords" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.keywords" :key="tag + i">
                <router-link class=" text-white hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PopUpPreview from '../PopUpPreview.vue'
import VideoPreview from '../VideoPreview.vue'

export default {
    name: "PlaylistResult",
    props:{
        item: Object,
        theme: Object
    },
    components:{
        PopUpPreview,
        VideoPreview
    },
    computed:{
        ...mapGetters([
            'videoSelected'
        ]),
        pills: function() {
            let pills = [];
            // field containing values you want to display as pills
            let possibleFields = ['identifier'];

            possibleFields.forEach(f => {
                if (f in this.item) {
                    if (Array.isArray(this.item[f])) {
                        this.item[f].forEach(v => pills.push({'field': f, 'value': v}));
                    }else{
                        pills.push({'field': f, 'value': this.item[f]})
                    }
                }
            });
            return pills;
        }
    }
}
</script>