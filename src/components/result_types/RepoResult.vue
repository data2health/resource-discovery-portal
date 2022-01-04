<template>
    <div class="text-left">
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fab fa-github text-blue-500"></i> Repository</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.label}}</router-link>
            </h5>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-between">
                <div class="text-center">
                    <img v-if="item && item._source.raw.owner.avatar_url" 
                    :src="item._source.raw.owner.avatar_url" 
                    alt="github avatar" 
                    class="rounded-full w-10 border border-gray-500 m-auto bg-white">
                    <p class="text-center">
                        <a :href="item?._source?.raw?.html_url" target="_blank" rel="nonreferrer">{{item?._source?.raw?.name}}</a>
                    </p>
                </div>
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <p class="mb-1"><i class="fab fa-github"></i> {{item?._source?.raw?.owner?.type}}</p>
                    <p class="mb-1"><i class="fas fa-lock"></i> {{item?._source?.raw?.visibility}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "RepoResult",
    props:{
        item: Object
    },
    computed:{
       
    }
}
</script>