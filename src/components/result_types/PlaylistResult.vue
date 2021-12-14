<template>
    <div class="text-left">
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fab fa-youtube-square text-red-600"></i> {{item._index}}</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.label}}</router-link>
            </h5>
            <p v-if="item && item?._source?.description" class="text-sm">{{item?._source?.description.substring(0, 200) + '...'}}</p>
            <p class="text-sm text-gray-500" v-else>No Description</p>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-between">
                <div class="text-center">
                    <template v-if="item && item._source.url">
                        <a :href="item._source.url" target="_blank" rel="nonreferrer">
                            <i class="fab fa-youtube-square text-red-600"></i> View Video Playlist <i class="fas fa-external-link-alt"></i>
                        </a>
                    </template>
                </div>
                <div class="ml-2 p-3 rounded border border-gray-500 text-xs">
                    <p class="mb-1"><i class="fas fa-info-circle"></i> {{item && item?._source?.channel?.channel_title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "PlaylistResult",
    props:{
        item: Object
    },
    computed:{

    }
}
</script>