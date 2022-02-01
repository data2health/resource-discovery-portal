<template>
    <div class="dark:bg-gray-800 dark:text-white bg-white relative">
        <div class="sticky top-0 bg-white/75 dark:bg-black/20 w-full z-50">
            <div class="flex justify-center items-center px-7 flex-wrap">
                <div class="hidden md:w-1/3 md:flex">
                <!-- spacer -->
                </div>
                <div class="container mx-auto w-full md:w-1/3 py-2 px-4 md:px-1 pt-5">
                    <form @submit.prevent="search()" class="w-full flex items-center group">
                        <div class="relative w-full">
                            <input
                            v-model="q"
                            type="text" 
                            placeholder="search" 
                            class="main-input w-full rounded-full">
                            
                            <button v-if="q" type="button" @click="clearSearch()" class="py-2 px-3 absolute right-10 hidden md:group-hover:inline">
                                <Popper content="Clear" class="tip" :hover="true" placement="bottom">
                                    <i class="fas fa-times fa-2x text-gray-400"></i>
                                </Popper>
                            </button>
                            
                            <button type="submit" class="btn-main absolute right-0">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-1/3 flex justify-center">
                    <AdvancedSearch></AdvancedSearch>
                </div>
            </div>
        </div>
        
        <div class="container mx-auto px-4 max-w-screen-lg">
            <!-- main container -->
            <div class="flex justify-around items-start flex-wrap">

                <!-- Results -->
                <div class="w-full flex-grow mx-3 highlight_container min-h-[75vh]">
                    <!-- details -->
                    <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                        <Pagination :items="results" key="top-pagination"></Pagination>
                    </div>
                    <!-- hits -->
                    <template v-for="(result, i) in results" :key="i">
                        <ExpandableResult :item="result"></ExpandableResult>
                    </template>
                    <div v-if="results && results.length">
                        <Pagination :items="results" key="bottom-pagination"></Pagination>
                    </div>
                </div>
                <!-- Bottom Column -->
                <div class="w-full flex justify-around items-center py-10">
                    <!-- Recent History -->
                    <div class="p-4 text-left rounded-lg bg-gray-200 dark:bg-gray-700 mb-2 w-1/3">
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
                                        {{item ? item.substring(0, 25) + '...' : item}}
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

import Pagination from '../components/Pagination.vue'
import ShareButtons from '../components/ShareButtons.vue'
import ExpandableResult from '../components/ExpandableResult.vue'
import AdvancedSearch from '../components/AdvancedSearch.vue'

export default {
    name: "Search",
    data: function(){
        return {
            highlighter: null,
            q:''
        }
    },
    components: {
        ExpandableResult,
        Pagination,
        ShareButtons,
        AdvancedSearch,
    },
    methods:{
        clearSearch(){
            this.q = '';
            this.$store.commit('saveQuery', {value: ''});
            this.$router.replace({'query': null});
            this.$store.dispatch('search', {value: null});
            this.$store.commit('changePage', 1);
            this.highlighter.unmark();
        },
        search(){
            if (this.$route?.query?.q) {
                this.q = this.$route?.query?.q;
            }
            this.$store.dispatch('search', {value: this.q});
        },
        clearRecentSearches() {
            this.$store.commit('clearRecentSearches');
        },
        download(){
            console.log('download')
        },
        highlightMatches(keyword){
            if (keyword) {
                this.highlighter.unmark();
                this.highlighter.mark(keyword, {"separateWordSearch": false, "className": "highlight"});
            }else{
                this.highlighter.unmark();
            }
        }
    },
    mounted: function(){
        this.highlighter = new Mark(document.querySelector(".highlight_container"));
        this.search();
    },
    updated: function(){
        this.highlightMatches(this.q);
    },
    computed:{
        ...mapGetters([
            'results',
            'recentSearches'
        ])
    }
}
</script>