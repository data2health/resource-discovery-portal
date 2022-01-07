<template>
    <div class="dark:bg-gray-800 dark:text-white bg-gray-100">
        <!-- Types -->
        <TypeFilter></TypeFilter>
        <div class="container mx-auto w-1/2 py-2">
            <!-- Search Bar -->
            <form @submit.prevent="search()" class="w-full flex items-center">
            <input 
            v-model="$route.query.q"
            type="text" 
            placeholder="search" 
            class="w-full m-auto py-2 px-4 text-2x text-main 
            rounded-full border-secondary border-2 focus:outline-none focus:ring-2 
            focus:ring-secondary-light focus:border-transparent dark:bg-gray-300 caret-pink-500">
            <button type="submit" class="btn-main ml-2">
                <i class="fas fa-search"></i>
            </button>
            </form>
        </div>
        <div class="container mx-auto px-4">
            <!-- main container -->
            <div class="flex justify-around items-start">
                <!-- Left columns -->
                <div class="p-1 flex-initial w-1/5 ">
                    <!-- Preferences -->
                    <Preferences></Preferences>
                    <!-- Filters -->
                    <div class="rounded-2xl p-2 mb-3 shadow bg-gray-100 dark:bg-gray-700 select-none hover:bg-gray-200">
                        <div @click="open = !open" class="rounded cursor-pointer text-gray-500 p-1 font-light flex justify-start text-sm items-center">
                            <button @click="open = !open" type="button" class="icon-btn bg-white dark:bg-gray-500">
                                <i class="fas text-secondary dark:text-tertiary-light" :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
                            </button> <span class="ml-2">Search <i class="fas fa-plus"></i></span>
                        </div>
                        <div v-if="open">
                            <FilterList type="checkbox" name="dataSource" :items="['CD2H','Outbreak.info','Data Discovery Engine','DataMed']"></FilterList>
                            <FilterList type="checkbox" name="dataType" :items="['Dataset','Publication','Video','Repository','Person', 'Clinical Trial']"></FilterList>
                        </div>
                    </div>
                </div>
                <!-- Results -->
                <div class="flex-initial w-64 flex-grow mx-3 highlight_container">
                    <!-- details -->
                    <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                        <Pagination :items="results" key="top-pagination"></Pagination>
                    </div>
                    <!-- hits -->
                    <template v-for="(result) in results" :key="result._source.label">
                        <Result :item="result"></Result>
                    </template>
                    <div>
                        <Pagination :items="results" key="bottom-pagination"></Pagination>
                    </div>
                </div>
                <!-- Right Column -->
                <div class="flex-initial w-1/5">
                    <!-- Recent History -->
                    <div class="p-4 text-left rounded-lg bg-gray-200 dark:bg-gray-700 mb-2">
                        <div class="flex justify-between items-center mb-3">
                            <p class="font-thin text-gray-500 text-sm">Recent Searches</p>
                            <Popper content="Clear All" class="tip" :hover="true" placement="right" arrow>
                                <button class="icon-btn icon-btn bg-gray-300 text-gray-400 
                                dark:bg-gray-600 dark:text-gray-500 hover:bg-red-400 dark:hover:bg-red-400 hover:text-white dark:hover:text-white"
                                @click.prevent="clearRecentSearches()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </Popper>
                        </div>
                        <ul>
                            <template v-for="(item, i) in recentSearches" :key="item + i">
                                <li class="text-xs mb-3">
                                    <Popper :content="item" class="tip" :hover="true" placement="right" arrow>
                                        <router-link :title="item" active-class="text-secondary"
                                        :to="{ path: '/search', query: { 'q': item }}">
                                        <i class="fas fa-search text-xs"></i> 
                                        {{item.length > 25 ? item.substring(0, 25) + '...' : item}}
                                        </router-link>
                                    </Popper>
                                </li>
                            </template>
                            <template v-if="recentSearches.length == 0">
                                <li class="text-gray-400">No Recent Searches</li>
                            </template>
                        </ul>
                    </div>
                    <!-- Sharing-->
                    <div class="p-4 text-left rounded-lg bg-gray-200 dark:bg-gray-700 mb-2">
                        <p class="font-thin text-gray-500">Sharing</p>
                        <div class="flex justify-around items-center p-2">
                            <!-- share URL -->
                            <CopyButton copy_msg="Copy URL" copy="COPY TEST"></CopyButton>
                            <!-- Download -->
                            <Popper content="Download Results" class="tip" :hover="true" placement="top">
                                <button class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary" 
                                    @click.prevent="download">
                                    <i class="fas fa-download text-white"></i>
                                </button>
                            </Popper>
                            <!-- Social -->
                            <ShareButtons></ShareButtons>
                        </div>
                        
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
import FilterList from '../components/FilterList.vue'
import Pagination from '../components/Pagination.vue'
import ShareButtons from '../components/ShareButtons.vue'
import TypeFilter from '../components/TypeFilter.vue'
import Preferences from '../components/Preferences.vue'

export default {
    name: "Search",
    data: function(){
        return {
            highlighter: null,
            open: false
        }
    },
    components: {
        Result,
        FilterList,
        Pagination,
        ShareButtons,
        TypeFilter,
        Preferences
    },
    methods:{
        search(){
            console.log('searching')
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        clearRecentSearches() {
            this.$store.commit('clearRecentSearches');
        },
        download(){
            console.log('download')
        }
    },
    updated: function(){
        // Highlight matches in results
        if(this.$route.query.q){
            this.highlighter.unmark();
            this.highlighter.mark(this.$route.query.q, {"separateWordSearch": false, "className": "highlight"});
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
    }
}
</script>