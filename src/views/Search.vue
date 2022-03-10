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
                            
                            <button type="submit" class="btn-main absolute right-0 inline md:hidden">
                                <i class="fas fa-search"></i>
                            </button>
                            <router-link v-if="q" :to="{path: '/search'}" class="-right-5 top-3 hidden md:inline absolute !text-gray-500">
                                <i class="fas fa-times"></i>
                            </router-link>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-1/3 flex justify-center">
                    <AdvancedSearch></AdvancedSearch>
                </div>
            </div>
            <Chips></Chips>
        </div>
        <!-- main container -->
        <div class="container mx-auto px-4 max-w-6xl">
            
            <div class="flex relative items-start flex-wrap md:flex-nowrap">
                <!-- type facets -->
                <div v-if="results" class="p-3 sticky top-20 bg-gray-100 dark:bg-gray-700 rounded-lg w-1/4">
                    <p class="text-xs text-gray-400">Resource Types</p>
                    <div v-for="type in filters['@type']" :key="type + 'f'" class="hidden md:flex mb-1 group justify-start items-center">
                        <input 
                            type="checkbox" 
                            :checked="type.active"
                            @click="activateFilter(type)"
                            :id="type.term" 
                            class="focus:ring-0 checked:!bg-accent-dark rounded-full border-gray-200 group-hover:border-accent-light mr-2">
                        <img :src="type.img" :alt="type" class="h-5 mr-2 inline">
                        <div>
                            <label class="text-xs cursor-pointer group-hover:text-accent" :for="type.term">
                                {{$filters.readableName(type.term)}}
                            </label>
                            <p v-if="type.result_count" data-aos="fade-in" class="text-xs text-gray-500 dark:text-gray-400"><span>{{$filters.numberWithCommas(type.result_count)}}</span></p>
                        </div>
                    </div>
                </div>

                <!-- Results -->
                <div class="flex-grow mx-3 highlight_container min-h-[75vh] w-3/4">
                    <!-- details -->
                    <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                        <Pagination :items="results" key="top-pagination"></Pagination>
                    </div>
                    <!-- hits -->
                    <template v-for="(result, i) in results" :key="i">
                        <Result :item="result"></Result>
                    </template>
                    <div v-if="results && results.length">
                        <Pagination :items="results" key="bottom-pagination"></Pagination>
                    </div>
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
                        <template v-for="(item, i) in recentSearches" :key="i + 'recent'">
                            <li class="text-xs mb-3" v-if="item">
                                <Popper :content="item" class="tip" :hover="true" placement="right" arrow>
                                    <router-link :title="item" active-class="text-secondary"
                                    :to="{ path: '/search', query: { 'q': item }}">
                                    <i class="fas fa-search text-xs text-accent-light"></i> 
                                    {{item && item.length > 25 ? item.substring(0, 25) + '...' : item}}
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
                        <CopyButton copy_msg="Copy URL" :copy="url"></CopyButton>
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
</template>

<script>
import { mapGetters } from 'vuex'
import Mark from 'mark.js'

import Pagination from '../components/Pagination.vue'
import ShareButtons from '../components/ShareButtons.vue'
import ExpandableResult from '../components/ExpandableResult.vue'
import AdvancedSearch from '../components/AdvancedSearch.vue'
import Chips from '../components/FilterChips.vue'
import Result from '../components/ResultWrapper.vue'

export default {
    name: "Search",
    data: function(){
        return {
            highlighter: null,
            q:'',
            url: window.location.href,
            download_data: {}
        }
    },
    components: {
        ExpandableResult,
        Pagination,
        ShareButtons,
        AdvancedSearch,
        Chips,
        Result
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
            if (this.q) {
                this.$router.push({ query: { q: this.q }})
                this.q = this.$route?.query?.q;
                this.$store.commit('addRecent', {value: this.q});
            }
            this.$store.commit('saveQuery', {value: this.q});
            this.$store.dispatch('search');
        },
        clearRecentSearches() {
            this.$store.commit('clearRecentSearches');
        },
        download() {
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(this.results, null, 2)], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = 'RDP_results.json';
            a.click();
        },
        highlightMatches(keyword){
            if (keyword) {
                this.highlighter.unmark();
                this.highlighter.mark(keyword, {"separateWordSearch": false, "className": "highlight"});
            }else{
                this.highlighter.unmark();
            }
        },
        activateFilter (type){
            this.$store.dispatch('activateFilter', {'section': '@type', 'filter': type});
        }
    },
    watch:{
        '$route.query.q': {
            handler: function(search) {
                this.q = search
            },
            deep: true,
            immediate: true
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
            'recentSearches',
            'filters'
        ])
    }
}
</script>