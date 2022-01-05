<template>
    <div class="text-left">
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" :index="item?._index"></ResultTab>
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
                    class="rounded-md w-10 border border-gray-500 m-auto bg-white">
                    <p class="text-center">
                        <a :href="item?._source?.raw?.html_url" target="_blank" rel="nonreferrer">{{item?._source?.raw?.name}}</a>
                    </p>
                </div>
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <p v-if="item?._source?.raw?.owner?.type" class="mb-1"><i class="fab fa-github" :class="theme.text"></i> {{item?._source?.raw?.owner?.type}}</p>
                    <p v-if="item?._source?.raw?.visibility" class="mb-1"><i class="fas fa-lock" :class="theme.text"></i> {{item?._source?.raw?.visibility}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ResultTab from '../ResultTab.vue'

export default {
    name: "RepoResult",
    props:{
        item: Object
    },
    components:{
        ResultTab
    },
    computed:{
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
    }
}
</script>