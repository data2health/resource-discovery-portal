<template>
    <div class="bg-black/20 rounded p-1 w-full hover:bg-black/40">
        <div class="p-1 rounded bg-black/20 break-words">
            <h6 v-if="video?.title" @click="selectVideo()" class="hover:text-accent cursor-pointer">{{video?.title}}</h6>
            <template v-if="fullView">
                <div v-html="video?.player"></div>
            </template>
            <template v-else>
                <img v-if="!videoView" @click="selectVideo()" src='/assets/img/videoPreview.svg' alt="Click to Play" class="inline w-16 cursor-pointer">
            </template>
        </div>
        <div v-if="fullView" class="flex flex-wrap">
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-clock"></i></template>
                <template v-slot:value>{{video?.duration}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-star"></i></template>
                <template v-slot:value>{{video?.favorite_count || 0}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-thumbs-up"></i></template>
                <template v-slot:value>{{video?.like_count || 0}}</template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title><i class="fas fa-eye"></i></template>
                <template v-slot:value>{{$filters.numberWithCommas(video?.view_count) || 0}}</template>
            </Pill>
        </div>
        <div v-if="video?.tag && fullView" class="space-x-1 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in video?.tag" :key="tag + i">
                <router-link class=" text-white hover:text-accent-light underline text-xs" :to='{path: "/search", query:{"q": `"` + tag?.tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag?.tag}}</router-link>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "VideoPreview",
    props: ['video', 'theme', 'fullView'],
    data: function() {
        return {
            videoView: false,
        }
    },
    methods:{
        selectVideo(){
            this.$store.commit('selectVideo', {'value': this.video});
        }
    }
}
</script>