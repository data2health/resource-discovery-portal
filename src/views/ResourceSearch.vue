<template>
    <div class="w-full min-h-screen darkMode">
        <div class="relative w-full pb-7">
            <div class="w-full sticky top-0" :class="sourceInfo.bg">
                <div class="max-w-screen-xl m-auto flex justify-between items-center flex-wrap p-2 md:px-6 text-white">
                    <div class="w-full space-y-5">
                        <div class="flex justify-start flex-wrap items-center w-full">
                            <router-link :to="{name:'Resources'}" class="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-200 m-1 mr-6"><i class="fas fa-chevron-left"></i> Back</router-link>
                            <img :src="sourceInfo.img" :alt="resource" class="h-6 md:h-14 mr-2">
                            <h3 class="font-bold  md: mr-2">{{resource}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container m-auto max-w-6xl">
                <div class="bg-gray-100 dark:bg-gray-900 rounded-2xl p-3 my-5 shadow">
                    <div class="flex justify-center items-center flex-wrap">
                        <div class="w-1/2 md:w-1/5" v-if="data && multipleSources">
                            <Chart :data="data" type="doughnut" name='Where is the data coming from?' :color="sourceInfo.hex"></Chart>
                        </div>
                        <div class=" w-full md:w-2/3">
                            <h1 class=" md: mb-3" :class="sourceInfo.text"><span class="capitalize">{{resource.endsWith('y') ? resource.replace('y', 'ies') : resource + 's'}}</span></h1>
                            <p>
                                Explore {{resource.endsWith('y') ? resource.replace('y', 'ies') : resource + 's'}} in the Resource Discovery Portal by scanning the most recently added to the collection or by searching with filters available.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- most recent -->
                <div class="w-full m-auto p-3 flex justify-center items-center w-full">
                    <div class="max-w-4xl w-full" v-if="mostRecentResults && mostRecentResults.length">
                        <h3 class=" my-7 font-light" :class="sourceInfo.text">Most Recent</h3>
                        <div class="max-h-64 overflow-scroll">
                            <table class="table-auto min-w-full table-main">
                                <tbody>
                                    <template v-for="(result, i) in mostRecentResults" :key="i">
                                        <tr>
                                            <td class="mb-1 font-extrabold text-blue-600 hover:text-accent-light cursor-context-menu w-3/4 p-1">
                                                <i :class="[sourceInfo.icon, sourceInfo.text]" class="mr-2 inline"></i>
                                                <PopUpPreview :content="result" :name="result?.name" :theme="sourceInfo"></PopUpPreview> 
                                            </td>
                                            <td class="w-1/4 text-center p-1">
                                                <p class="text-xs">
                                                    <template v-if="result?.dateModified">{{$filters.formatDate(result?.dateModified)}}</template>
                                                    <template v-else-if="result?.date_modified">{{$filters.formatDate(result?.date_modified)}}</template>
                                                </p>
                                                <router-link class="bg-green-500 hover:bg-green-300 ml-1 !text-white p-1 rounded-full px-2 text-xs" 
                                                :to="{ path: '/resources/' + resource + '/' + result._id}">more info<i class="fas fa-arrow-alt-circle-right"></i></router-link>
                                            </td>
                                        </tr>
                                    </template>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button class="w-full bg-gray-200 dark:bg-gray-600 p-1 " @click="loadMore">Load more</button>
                        </div>
                    </div>
                </div>
                <!-- search -->
                <div class="w-full m-auto p-3 highlight_container rounded-2xl bg-gray-100 dark:bg-gray-900">
                    <div class="p-3">
                        <h2 class=" font-light text-center my-2" :class="sourceInfo.text">
                            <i class="fas fa-search"></i> Search
                        </h2>
                        <form @submit.prevent="search()" class="w-1/2 flex items-center m-auto">
                            <input v-model="q"
                                type="text" 
                                placeholder="search" 
                                class="main-input w-full rounded-full">
                        </form>
                    </div>
                    <div class="w-full flex flex-wrap justify-center">
                        <div class="w-full md:w-1/4 p-4">
                            <template v-for="filter in sourceInfo?.['standaloneSearchFilters']" :key="filter.name">
                                <FilterList :name="filter.name" :section="filter.value" :items="filters[filter.value]"></FilterList>
                            </template>
                        </div>
                        <div class="w-full md:w-3/4 p-4">
                            <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                                <Pagination :items="results" key="top-pagination"></Pagination>
                            </div>
                            <template v-for="(result, i) in results" :key="i">
                                <Result :item="result" :showTab="false"></Result>
                            </template>
                            <div class="mb-3 p-2 dark:text-gray-500 text-gray-400">
                                <Pagination :items="results" key="bottom-pagination"></Pagination>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import axios from 'axios';
import Mark from 'mark.js'

import Chart from '../components/Chart.vue'
import PopUpPreview from '../components/PopUpPreview.vue'
import FilterList from '../components/FilterList.vue'
import Pagination from '../components/Pagination.vue'
import Result from '../components/ResultWrapper.vue'

export default {
    name: 'ResourceSearch',
    data: function(){
        return {
            data: null,
            q:'',
            highlighter: null,
            more: 0,
            multipleSources: true
        }
    },
    props:{
        resource: String,
    },
    components:{
        Chart,
        PopUpPreview,
        FilterList,
        Pagination,
        Result
    },
    computed:{
        ...mapGetters([
            'baseURL',
            'results',
            'sourceReadableNames',
            'filters',
            'mostRecentResults'
        ]),
        sourceInfo: function() {
            return this.$store.getters.getTheme(this.resource);
        },
    },
    methods:{
        drawChart(){
            let self = this;
            axios.get(this.baseURL + `?aggs=_index&q=resourceTypeName:${this.resource}&size=0`).then(res=>{

                let data = {
                    labels: [],
                    datasets: [{data: []}]
                };

                if( res.data?.facets?.['_index']?.terms){
                    if (res.data?.facets?.['_index']?.terms.length <= 1) {
                        self.multipleSources = false;
                    }
                    res.data?.facets?.['_index']?.terms.forEach(termInfo => {
                        //chart data for /About
                        let name = termInfo.term
                        if (name in this.sourceReadableNames) {
                            name = this.sourceReadableNames[name].name
                        }else if(name.includes('outbreak')){
                            name = name.split('_')[1];
                        }
                        data.labels.push(name);
                        data.datasets[0].label = 'Data Sources';
                        data.datasets[0].data.push(termInfo.count);
                    });
                }

                self.data = data;

            }).catch(err=>{
                console.log(err);
            });
        },
        search(){
            if (this.q) {
                this.$router.push({ query: { q: this.q }})
                this.q = this.$route?.query?.q;
            }
            this.$store.commit('saveQuery', {value: this.q});
            this.$store.dispatch('search', {'resourceFilter': this.resource});
        },
        highlightMatches(keyword){
            if (keyword) {
                this.highlighter.unmark();
                this.highlighter.mark(keyword, {"separateWordSearch": false, "className": "highlight"});
            }else{
                this.highlighter.unmark();
            }
        },
        aggregateField(field){
            let self = this;
            let def = {
                'active': false
            };

            axios.get(this.baseURL + `?aggs=${field}&q=resourceTypeName:${this.resource}&facet_size=20`).then(res=>{

                res.data?.facets?.[field]?.terms.forEach(termInfo => {
                    self.$store.commit('addFilter', {
                        'section': field,
                        'filter' : {...termInfo, ...def}
                    })
            });

            console.log(self.filters)

            }).catch(err=>{
                console.log(err);
            });
        },
        loadMore(){
            this.more += 3;
            this.$store.dispatch('getMostRecent', {
                'resource': this.resource,
                'size': this.more
                });
        }
    },
    mounted: function () {
        this.highlighter = new Mark(document.querySelector(".highlight_container"));
        //side filters for this type in store mapping
        if (this.sourceInfo?.['standaloneSearchFilters']?.length) {
            this.sourceInfo?.['standaloneSearchFilters'].forEach(filter => {
                this.aggregateField(filter.value);
            });
        }
        this.drawChart();
        this.search();
        this.$store.dispatch('getMostRecent', {'resource': this.resource});
    },
    updated: function(){
        this.highlightMatches(this.q);
    },
    watch:{
        '$route.query.q': {
            handler: function(search) {
                this.q = search
            },
            deep: true,
            immediate: true
        },
    },
}
</script>
