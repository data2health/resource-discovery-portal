<template>
    <router-link :to="'/resources/' + title">
        <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-32 md:w-64 bg-white hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 group">
            <div class="p-4 text-center space-y-3 break-words">
                <h1 class="font-bold text-xs md:text-lg text-gray-700 dark:text-gray-400 group-hover:text-tertiary">{{title}}</h1>
                <img :src="sourceInfo.img" alt="logo" :class="sourceInfo.fill" class="rounded w-full md:w-1/3 m-auto group-hover:-rotate-12 transition-all duration-200">
                <p v-if="sourceInfo.count" class="text-sm text-center mt-3">{{$filters.numberWithCommas(sourceInfo.count)}} available</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ResourceCard',
    props: {
        title: String
    },
    computed: {
        sourceInfo: function() {
            return this.$store.getters.getTheme(this.title.endsWith('s') ? this.title.slice(0, -1) : this.title);
        },
    }
}
</script>