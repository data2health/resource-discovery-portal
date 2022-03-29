<template>
    <!--🦄 Type Specific Content 🦄-->
    <div :class="theme.bg">
        <!-- 🦄 Badges 🦄 -->
        <div class="flex justify-start items-center flex-wrap bg-white dark:bg-gray-700">
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-closed-captioning"></i></template>
                <template v-slot:value>
                    <i v-if="item?.caption == true" class="fas fa-check-circle text-green-300"></i>
                    <i v-else-if="item?.caption == false" class="fas fa-times text-red-400"></i>
                    <span v-else>Not Provided</span>
                </template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-thumbs-down"></i></template>
                <template v-slot:value>{{item?.dislike_count}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-thumbs-up"></i></template>
                <template v-slot:value>{{item?.like_count}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-comment"></i></template>
                <template v-slot:value>{{item?.comment_count}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-star"></i></template>
                <template v-slot:value>{{item?.favorite_count}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-video"></i></template>
                <template v-slot:value><span class="uppercase">{{item?.definition}}</span></template>
            </Pill>
        </div>

        <div class="flex justify-center flex-wrap items-center p-2">
            <!-- 🦄 Video details 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded p-2 flex justify-around items-center space-y-1 m-2">
                <span v-if="item?.published" class="text-sm">
                    <i class="fas fa-video" :class="theme.text"></i> Published on <b>{{$filters.formatDate(item?.published)}}</b>
                </span>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded p-2 flex justify-around items-center space-y-1 m-2">
                <span v-if="item?.duration" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> <b>{{item?.duration}}</b>
                </span>
            </div>
            <!--🦄 Video 🦄-->
            <div v-if="videoThumbnail && videoPlayer" class="w-full">
                <img v-if="!videoView" @click="videoView = !videoView" :src="videoThumbnail.url" alt="video thumbnail" class="w-3/4 m-auto hover:shadow hover:cursor-pointer">
                <div v-else class="flex justify-center" v-html="videoPlayer"></div>
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
                <h1>No Video Available</h1>
            </div>

        </div>
        <div v-if="item?.keywords" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.keywords" :key="tag + i">
                <router-link class="text-sm text-white hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
            </template>
        </div>
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Video",
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
        fullView: Boolean,
        theme: Object
    },
    components:{
        PopUpPreview,
    },
    computed:{
        videoThumbnail: function(){
            let prefs = ['standard', 'default', 'high'];
            for (let i = 0; i < prefs.length; i++) {
                if (this.item?.video_thumbnail.find(thumbnail => thumbnail.size == prefs[i])) {
                    return this.item?.video_thumbnail.find(thumbnail => thumbnail.size == prefs[i]);
                }
            }
        },
        videoPlayer: function(){
            return this.item?.player
        }
    }
}
</script>