<template>
        <div class=" rounded-2xl m-2 w-full md:w-64 cursor-pointer hover:shadow-lg group flex items-stretch justify-center hover:bg-gray-200 transition-all duration-600" :class="[sourceInfo.bg]">
            <router-link :to="'/resources/' + title" class="w-8 md:w-1/3 flex items-center justify-center mx-3">
                <img :src="sourceInfo.img" :alt="sourceInfo.term" :class="sourceInfo.fill" class="w-full group-hover:animate-bounce transition-all duration-200">
            </router-link>
            <div class="w-full bg-black/20 dark:bg-black/40 p-3 rounded-2xl rounded-l-none  flex items-center justify-center">
                <router-link :to="'/resources/' + title" class="block">
                    <h6 class="font-bold md:text-sm text-white group-hover:text-white">
                        {{pluralize(title)}} <small v-if="sourceInfo.count" class="text-center text-xs text-white inline md:hidden ml-4">{{$filters.numberWithCommas(sourceInfo.count)}}</small>
                    </h6>
                    <small v-if="sourceInfo.count" class="hidden md:inline text-left text-xs text-white">{{$filters.numberWithCommas(sourceInfo.count)}}</small>
                </router-link>
            </div>
        </div>
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