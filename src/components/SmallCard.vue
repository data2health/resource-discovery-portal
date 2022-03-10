<template>
    <!-- card -->
    <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-full md:w-64 group bg-white">
        <div class="p-2 text-center space-y-1 flex flex-row md:flex-col justify-evenly items-center">
            <h1 class="font-bold text-xs md:text-lg text-gray-700 dark:text-gray-400 order-2 md:order-1">
                <router-link :to="'/resources/' + title">{{$filters.readableName(title)}}</router-link>
            </h1>
            <img :src="sourceInfo.img" :alt="title" class="rounded w-16 md:w-1/3 md:group-hover:hidden order-1 md:order-2">
        </div>
        <div class="text-left text-sm p-1 md:p-4">
            <ul class="space-y-2 hidden md:group-hover:block">
                <li v-for="item in items" :key="item + 'card'">
                    <i class="fas fa-search" :class="sourceInfo.text"></i> <router-link 
                    class="!text-main dark:!text-accent hover:!text-accent-light dark:hover:!text-accent-light" 
                    :to="{ path: '/search', query: { 'q': item + ' AND resourceTypeName:' + title}}">
                        {{item}}
                    </router-link>
                </li>
            </ul>
            <p v-if="docCount" class="text-sm text-center mt-3 md:group-hover:hidden">{{$filters.numberWithCommas(docCount)}} available</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SmallCard',
    props: {
        items: Array,
        title: String
    },
    computed: {
        sourceInfo: function() {
            //remove 's' if title is plural
            return this.$store.getters.getTheme(this.title.endsWith('s') ? this.title.slice(0, -1) : this.title);
        },
        ...mapGetters([
            'resourceTypes'
        ]),
        docCount: function(){
            if (this.title in this.resourceTypes) {
                return this.resourceTypes[this.title].count
            }else{
                return false
            }
        }
    }
}
</script>