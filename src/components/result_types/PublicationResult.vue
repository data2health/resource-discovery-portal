<template>
    <div>
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fas fa-book text-green-500"></i> {{item._index}}</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold ml-3 p-1">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.name}}</router-link>
            </h5>
            <p v-if="item && item?._source?.abstract" class="text-sm">{{item?._source?.abstract.substring(0, 200) + '...'}}</p>
            <p class="text-sm text-gray-500" v-else>No Description</p>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-500 text-xs" v-if="authors && authors.length">
                    <p>Authors:</p>
                    <template v-if="authors.length < 10">
                        <p class="mb-1" v-for="author in authors" :key="author"><i class="fas fa-user"></i> {{author}}</p>
                    </template>
                    <p v-else class="mb-1"><i class="fas fa-user"></i> {{authors.length}} authors</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "PublicationResult",
    props:{
        item: Object
    },
    computed:{
        authors: function(){
            if (this.item && this.item?._source?.author) {
                return this.item?._source?.author.map(item => item.name);
            }else{
                return false
            }
        }
    }
}
</script>