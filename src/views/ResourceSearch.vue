<template>
    <div class="w-full min-h-screen darkMode">
        <div class="relative w-full pb-7">
            <div class="w-full sticky top-0" :class="sourceInfo.bg">
                <div class="max-w-screen-xl m-auto flex justify-between items-center flex-wrap p-2 md:px-6 text-white">
                    <div class="w-full space-y-5">
                        <div class="flex justify-start flex-wrap items-center w-full">
                            <router-link :to="{name:'Resources'}" class="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-200 m-1 mr-6"><i class="fas fa-chevron-left"></i> Back</router-link>
                            <img :src="sourceInfo.img" :alt="resource" class="h-6 md:h-14 mr-2">
                            <h1 class="font-bold text-md md:text-3xl mr-2">{{resource}}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container m-auto max-w-6xl">
                <div class="bg-gray-100 dark:bg-gray-900 rounded-2xl p-3 my-5 shadow">
                    <div class="flex justify-center items-center flex-wrap">
                        <div class="w-1/2 md:w-1/3" v-if="data">
                            <Chart :data="data" type="doughnut" name='Where is the data coming from?' :color="sourceInfo.hex"></Chart>
                        </div>
                        <div class="text-xl w-full md:w-2/3">
                            <h1 class="text-2xl md:text-4xl mb-3" :class="sourceInfo.text"><span class="font-extrabold">RDP</span> <span class="capitalize">{{resource}}s</span></h1>
                            <template v-if="sourceInfo?.description">
                                <p v-html="sourceInfo.description"></p>
                            </template>
                            <p v-else>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita delectus iste perferendis eos architecto rem animi dicta dignissimos quia incidunt maxime error, mollitia repellendus blanditiis, ea laborum non impedit. Aut.</p>
                        </div>
                    </div>
                </div>
                <!-- most recent -->
                <div class="w-full m-auto p-3">
                    <h2 class="text-4xl my-7 font-light" :class="sourceInfo.text">Most Recent</h2>
                    <template v-for="(result, i) in results" :key="i">
                        <p class="mb-4 font-extrabold text-blue-600 hover:text-tertiary-light cursor-pointer" v-if="i < 3">
                            <img :src="sourceInfo.img" :alt="resource" class="h-6 mr-2 inline"> 
                            <PopUpPreview :content="result" :name="result?.name" :theme="sourceInfo"></PopUpPreview> 
                            <router-link class="bg-green-500 hover:bg-green-300 ml-1 !text-white p-1 rounded-full text-xs px-2" 
                            :to="{ path: '/resources/' + resource + '/' + result._id}">more info <i class="fas fa-arrow-alt-circle-right"></i></router-link>
                        </p>
                    </template>
                </div>
                <!-- search -->
                <div class="w-full m-auto p-3 highlight_container">
                    <div class="p-3 rounded-2xl bg-gray-100 dark:bg-gray-900">
                        <h2 class="text-4xl font-light text-center my-2" :class="sourceInfo.text">
                            <i class="fas fa-search"></i> Search
                        </h2>
                        <form @submit.prevent="search()" class="w-1/2 flex items-center m-auto">
                            <input v-model="q"
                                type="text" 
                                placeholder="search" 
                                class="main-input w-full rounded-full">
                        </form>
                    </div>
                    <!-- <template v-for="(result, i) in results" :key="i">
                        <p class="mb-4 font-extrabold">
                            {{result?.name}}  
                            <router-link class="!text-green-500 hover:!text-green-300 ml-1" 
                            :to="{ name: 'ResultDetails', query: {'resource': result._id} }">more info</router-link>
                        </p>
                    </template> -->
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

export default {
    name: 'ResourceSearch',
    data: function(){
        return {
            data: null,
            q:'',
            highlighter: null,
        }
    },
    props:{
        resource: String,
    },
    components:{
        Chart,
        PopUpPreview
    },
    computed:{
        ...mapGetters([
            'baseURL',
            'results',
            'sourceReadableNames'
        ]),
        sourceInfo: function() {
            return this.$store.getters.getTheme(this.resource);
        },
    },
    methods:{
        drawChart(){
            let self = this;
            axios.get(this.baseURL + `?aggs=_index&q=@type:${this.resource}&size=0`).then(res=>{

                // let data = {
                //     labels: [self.resource],
                //     datasets: []
                // };

                let data = {
                    labels: [],
                    datasets: [{data: []}]
                };

                let colors = ['#1F78B4', '#33A02C', '#6A3D9A', '#A6CEE3', '#B2DF8A', '#CAB2D6', '#E31A1C', '#FB9A99', '#FDBF6F', '#FF7F00']
                
                // if( res.data?.facets?.['_index']?.terms){
                //     res.data?.facets?.['_index']?.terms.forEach((termInfo, i) => {
                //         //chart data for /About
                //         data.datasets[0].push({
                //             label: termInfo.term,
                //             data: [termInfo.count],
                //             backgroundColor: colors[i]
                //         });
                //     });
                // }

                if( res.data?.facets?.['_index']?.terms){
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
                this.$store.commit('addRecent', {value: this.q});
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
        }
    },
    mounted: function () {
        this.highlighter = new Mark(document.querySelector(".highlight_container"));
        this.drawChart();
        this.search();
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
