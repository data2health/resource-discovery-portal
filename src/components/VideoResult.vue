<template>
    <div class="text-left">
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fab fa-youtube text-red-500"></i> {{item._index}}</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-14 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <a href="#">{{item._source.label}}</a>
            </h5>
            <p class="text-sm">{{item?._source?.description.substring(0, 200) + '...'}}</p>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-items-center items-center">
                <!-- player -->
                <template v-if="item._source?.player">
                    <div v-html="item._source.player"></div>
                </template>
                <!-- thumbnail -->
                <div v-else-if="videoThumbnail">
                    <img :src="videoThumbnail.url" alt="video thumbnail" class="w-1/3 hover:border hover:border-red-500 hover:cursor-pointer">
                </div>
                <div class="ml-2 p-3 rounded border border-gray-500 text-xs">
                        <p><i class="far fa-clock"></i> {{item?._source?.duration}}</p>
                        <p><i class="fas fa-thumbs-up"></i> {{item?._source?.like_count}}</p>
                        <p><i class="fas fa-eye"></i> {{item?._source?.view_count}}</p>
                    </div>
            </div>
            <div v-if="item?._source?.tag">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in item?._source?.tag" :key="tag + i">
                    <i class="fas fa-tag"></i> {{tag?.tag}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "VideoResult",
    props:{
        item: Object
    },
    computed:{
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
                console.log('no thumbnail')
                return false
            }
        }
    }
}
</script>