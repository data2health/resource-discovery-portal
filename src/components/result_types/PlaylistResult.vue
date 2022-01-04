<template>
    <div class="text-left">
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fab fa-youtube-square text-red-600"></i> Video Playlist</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.label}}</router-link>
            </h5>
            <Description :text="item?._source?.description"></Description>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-between">
                <div class="text-center">
                    <template v-if="item && item._source.url">
                        <a :href="item._source.url" target="_blank" rel="nonreferrer" class="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-500">
                            <i class="fab fa-youtube-square text-red-600"></i> View Video Playlist <i class="fas fa-external-link-square-alt text-red-600"></i>
                        </a>
                    </template>
                </div>
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <p class="mb-1"><i class="fas fa-info-circle text-red-600"></i> {{item && item?._source?.channel?.channel_title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Description from '../ExpandableDescription.vue'

export default {
    name: "PlaylistResult",
    props:{
        item: Object
    },
    components:{
        Description
    }
}
</script>