<template>
    <div class="rounded-xl m-2 w-full md:w-64 cursor-pointer hover:shadow-lg group flex items-center justify-center" :class="[sourceInfo.bg]">
        <router-link :to="'/resources/' + title" class="flex items-center break-words">
            <div class="p-2 md:p-4 text-center space-x-2 md:space-x-0 md:space-y-2 flex flex-row md:flex-col items-center justify-between w-full">
                <h1 class="font-bold text-sm md:text-md text-white group-hover:text-white order-2 md:order-1">{{$filters.readableName(title)}}</h1>
                <img :src="sourceInfo.img" alt="logo" :class="sourceInfo.fill" class="rounded mr-3 w-8 md:w-1/4 group-hover:animate-bounce transition-all duration-200 order-1 md:order-2">
                <p v-if="sourceInfo.count" class="text-sm text-center order-3 text-white">{{$filters.numberWithCommas(sourceInfo.count)}} available</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ResourceCard',
    props: {
        title: String,
        sourceInfo: Object
    }
}
</script>