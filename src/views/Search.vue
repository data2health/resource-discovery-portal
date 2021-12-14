<template>
    <div class="dark:bg-gray-800 dark:text-white bg-gray-100">
        <div class="container mx-auto w-1/2 py-6">
            <!-- Search Bar -->
            <form @submit.prevent="search()" class="w-full flex items-center">
            <input 
            v-model="$route.query.q"
            type="text" 
            placeholder="search" 
            class="w-full m-auto py-2 px-4 text-2x text-main 
            rounded-full border border-transparent focus:outline-none focus:ring-2 
            focus:ring-secondary-light focus:border-transparent dark:bg-gray-300">
            <button type="submit" class="btn-main ml-2">
                <i class="fas fa-search"></i>
            </button>
            </form>
        </div>
        <div class="container mx-auto px-4">
            <!-- Types -->
            <div class="flex justify-around items-stretch">
                <!-- Filters -->
                <div class="flex-initial w-32">filter</div>
                <!-- Results -->
                <div class="flex-initial w-64 flex-grow mx-3 highlight_container">
                    <!-- details -->
                    <div class="mb-3 p-2">
                        <p class="text-sm">{{results.length}} results</p>
                    </div>
                    <!-- hits -->
                    <template v-for="(result) in results" :key="result._source.label">
                        <Result :item="result"></Result>
                    </template>
                </div>
                <!-- Recent History -->
                <div class="flex-initial w-1/6">
                    <div class="p-4 text-left rounded bg-gray-400 dark:bg-gray-700">
                        <h3 class="font-thin text-coolGray-100 mb-3">Recent Searches</h3>
                        <ul>
                            <template v-for="(item, i) in recentSearches" :key="item + i">
                                <li class="text-xs mb-3">
                                    <router-link :title="item"
                                    :to="{ path: '/search', query: { 'q': item }}">
                                       <i class="fas fa-search text-xs"></i> 
                                       {{item.length > 25 ? item.substring(0, 25) + '...' : item}}
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mark from 'mark.js'

import Result from '../components/ResultWrapper.vue'

export default {
    name: "Search",
    data: function(){
        return {
            highlighter: null
        }
    },
    components: {
        Result
    },
    methods:{
        search(){
            console.log('searching')
            this.$store.dispatch('search', {value: this.$route.query.q});
        }
    },
    updated: function(){
        // Highlight matches in results
        if(this.$route.query.q){
            this.highlighter.unmark();
            this.highlighter.mark(this.$route.query.q, {"separateWordSearch": false});
        }
    },
    mounted: function(){
        this.highlighter = new Mark(document.querySelector(".highlight_container"));
        this.search();
    },
    computed:{
      ...mapGetters([
        'results',
        'recentSearches'
      ]),
    },
}
</script>

<style>
    mark{
        background-color: none !important;
        color: red;
    }
</style>