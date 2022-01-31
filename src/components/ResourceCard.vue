<template>
    <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-full md:w-64 bg-white hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 group">
        <router-link :to="'/resources/' + title" class="flex items-center break-words">
            <div class="p-2 md:p-4 text-center space-y-3 flex flex-row md:flex-col items-center justify-around w-full">
                <h1 class="font-bold text-xs md:text-md text-gray-700 dark:text-gray-400 group-hover:text-tertiary order-2 md:order-1">{{title}}</h1>
                <img :src="sourceInfo.img" alt="logo" :class="sourceInfo.fill" class="rounded w-8 md:w-1/3 group-hover:-rotate-12 transition-all duration-200 order-1 md:order-2">
                <p v-if="sourceInfo.count" class="text-sm text-center order-3">{{$filters.numberWithCommas(sourceInfo.count)}} available</p>
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