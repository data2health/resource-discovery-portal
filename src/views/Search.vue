<template>
    <div class="dark:bg-gray-800 dark:text-white bg-gray-100 relative">
        <div class="sticky top-0 bg-gray-200/75 dark:bg-gray-900/75 w-full z-50">
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
                            class="main-input w-full rounded md:rounded-full">
                            
                            <button type="submit" class="btn-main absolute -right-8 inline md:hidden -mt-1">
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
        <div class="container mx-auto px-4 max-w-7xl">
            
            <div class="flex relative items-start flex-wrap md:flex-nowrap">
                <div class="w-full md:w-1/4 inline md:sticky top-40 space-y-3 mt-10">
                    <!-- type facets -->
                    <div class="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <details open>
                            <summary class="cursor-pointer p-1"><h2 class="text-black dark:text-white inline text-sm">Resource Types</h2></summary>
                            <button @click="selectAllResources(false)" class="bg-gray-300 hover:bg-gray-200 text-gray-600 p-1 rounded text-xs my-2">
                                {{allSelected ? "Unselect All Categories" : "Select All Types"}}
                            </button>
                            <details v-for="(items, group) in grouped" :key="group" open>
                                <summary class="text-xs text-gray-500 dark:text-gray-300 py-2 cursor-pointer select-none" :aria-label="'Expand ' + group + ' filters'">
                                    {{group}}
                                </summary>
                                <div class="ml-2">
                                    <button v-if="canSelectAll(items)" @click="selectAllResources(items)" class="bg-gray-300 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-2xl text-xs my-2">
                                        Select All
                                    </button>
                                    <template v-for="type in items" :key="type + 'f'">
                                        <div v-if="type.result_count" class="flex mb-3 group justify-start items-center">
                                            <input 
                                                type="checkbox" 
                                                :checked="type.active"
                                                @click="activateFilter(type)"
                                                :id="type.term" 
                                                :aria-label="'Click to toggle ' + type + ' filter'"
                                                class="focus:ring-0 checked:!bg-accent-dark rounded border-gray-200 group-hover:border-accent-light mr-2">
                                            <img :src="type.img" :alt="type" class="h-5 mr-2 inline">
                                            <div class="flex justify-start items-center">
                                                <label class="text-xs cursor-pointer group-hover:text-gray-600 dark:group-hover:text-gray-200 font-bold leading-tight" :class="type.active ? type.text : ''" :for="type.term">
                                                    {{$filters.readableName(type.term)}}
                                                </label>
                                                <small v-if="type.result_count" class="text-xs text-gray-900 dark:text-gray-200 block md:inline md:ml-2"><span>({{$filters.numberWithCommas(type.result_count)}})</span></small>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </details>
                        </details>
                    </div>
                    
                    <!-- Sharing-->
                    <div class="p-4 text-left rounded-lg bg-gray-200 dark:bg-gray-700">
                        <h2 class="text-gray-800 text-sm dark:text-white">Sharing</h2>
                        <div class="flex justify-around items-center p-2 flex-wrap">
                            <!-- Download -->
                            <Popper content="Download Results" class="tip" :hover="true" placement="top">
                                <button class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary" 
                                    @click.prevent="download">
                                    <i class="fas fa-download text-white"></i>
                                </button>
                            </Popper>
                            <!-- Social -->
                            <ShareButtons></ShareButtons>
                            <!-- share URL -->
                            <CopyButton copy_msg="Copy URL" :copy="url" color="bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary"></CopyButton>
                        </div>
                    </div>
                    <!-- Recent History -->
                    <div class="p-4 text-left rounded-lg bg-gray-200 dark:bg-gray-700 w-full">
                        <div class="flex justify-between items-center mb-3">
                            <h2 class="text-gray-800 text-sm dark:text-white">Recent Searches</h2>
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
                                <li class="text-sm mb-3" v-if="item">
                                    <Popper :content="item" class="tip" :hover="true" placement="right" arrow>
                                        <router-link :title="item" active-class="text-secondary"
                                        :to="{ path: '/search', query: { 'q': item }}">
                                        <i class="fas fa-search  text-accent-light"></i> 
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
                </div>
                
                <!-- Results -->
                <div class="flex-grow highlight_container min-h-[75vh] w-full md:w-3/5 p-2">
                    <!-- details -->
                    <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                        <Pagination :items="results" key="top-pagination"></Pagination>
                    </div>
                    <!-- hits -->
                    <template v-for="(result, i) in results" :key="i">
                        <Result :item="result" :showTab="true"></Result>
                    </template>
                    <div v-if="results && results.length">
                        <Pagination :items="results" key="bottom-pagination"></Pagination>
                    </div>
                </div>
                <div class="hidden md:w-1/6 md:inline">
                <!-- spacer -->
                </div>
            </div>

            <!-- Bottom Column -->
            <div class="w-full flex justify-around items-center py-10">
               
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
            // q:'',
            url: window.location.href,
            download_data: {},
            'groups':{
                'Multimedia':['Video', 'Playlist', 'Video Channel', 'Multimedia Object'],
                'People & Institutions':['Profile', 'Institution'],
                'Funding':['Funding Opportunity', 'Grant'],
                'Education': ['Education Resource'],
                'Research': ['Dataset', 'Clinical Trial', 'Protocol', 'Repository', 'Tool', 'Publication', 'Service', 'Research Instrument'],
                "Creative Works": ['Other Creative Work']
            },
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
        selectAllResources(items){
            this.$store.commit('selectAllResources', {'resources': items});
            this.$store.dispatch('search');
        },
        search(){
            // if (this.q) {
            //     this.$router.push({ query: { q: this.q }})
            //     this.q = this.$route?.query?.q;
            //     this.$store.commit('addRecent', {value: this.q});
            // }
            // this.$store.commit('saveQuery', {value: this.q});
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
            this.$store.dispatch('activateFilter', {'section': 'resourceTypeName.keyword', 'filter': type});
            this.$store.dispatch('search');
        },
        canSelectAll(items){
            if (items.length < 2) {
                return false
            }
            if (items.find((f) => f.result_count)) {
                return true
            }else{
                return false
            }
        }
    },
    watch:{
        '$route.query.q': {
            handler: function(search) {
                this.$store.commit('saveQuery', {value: search});
            },
            deep: true,
            immediate: true
        },
        'q': function(v){
            // silently update url param without reloading
            if (v) {
                var finalURL = window.location.origin + window.location.pathname;
                finalURL = finalURL + '?q=' + v;
                window.history.pushState({"html":'content',"pageTitle": 'RDP'},"", finalURL);
            }else{
                var finalURL = window.location.origin + window.location.pathname;
                window.history.pushState({"html":'content',"pageTitle": 'RDP'},"", finalURL);
            }
        },
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
            'filters',
            'allSelected'
        ]),
        q: {
            get() {
                return this.$store.getters.query
            },
            set(value) {
                this.$store.commit('saveQuery', {value: value});
            }
        },
        grouped: function(){
            let groups = {}
            function addToGroups(name, value) {
                if (Object.hasOwnProperty.call(groups, name)) {
                    groups[name].push(value)
                }else{
                    groups[name] = [value]
                }
            }
            this.filters['resourceTypeName.keyword'].forEach(resource => {
                //Video
                let found = false;
                for (const option in this.groups) {
                    let group_members = this.groups[option];
                    if (group_members.includes(resource.term)) {
                        addToGroups(option, resource);
                        found = true;
                    }
                }
                if (!found) {
                    addToGroups('More', resource);
                }
            });
            return groups;
        }
    },
    
}
</script>