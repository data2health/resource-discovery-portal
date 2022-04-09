<template>
    <router-link :to="'/resources/' + title" class="flex items-center break-words w-full md:w-64">
        <div class="rounded-2xl m-2 w-full md:w-full cursor-pointer hover:shadow-lg group flex items-center justify-center hover:bg-gray-200 transition-all duration-600" :class="[sourceInfo.bg]">
            <img :src="sourceInfo.img" :alt="sourceInfo.term" :class="sourceInfo.fill" class="mx-3 w-8 md:w-1/4 group-hover:animate-bounce transition-all duration-200">
            <div class="w-full bg-black/20 dark:bg-black/40 p-3 rounded-2xl rounded-l-none">
                <h6 class="font-bold md:text-sm text-white group-hover:text-white">
                    {{pluralize(title)}} <small v-if="sourceInfo.count" class="text-center text-xs text-white inline md:hidden ml-4">{{$filters.numberWithCommas(sourceInfo.count)}}</small>
                </h6>
                <small v-if="sourceInfo.count" class="hidden md:inline text-left text-xs text-white">{{$filters.numberWithCommas(sourceInfo.count)}}</small>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ResourceCard',
    props: {
        title: String,
        sourceInfo: Object
    },
    methods:{
        pluralize(string){
            return string.endsWith('ty') ? string.replace('ty', 'ties') : 
            string.endsWith('y') ? string.replace('y', 'ies') : string + 's';
        }
    }
}
</script>