<template>
    <div class="w-full min-h-screen darkMode">
        <div class="relative w-full py-7">
            <div class="w-full sticky top-0" :class="sourceInfo.bg">
                <div class="max-w-screen-xl m-auto flex justify-between items-center flex-wrap p-2 md:px-6 text-white">
                    <router-link to="/resources" class="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-200 m-1"><i class="fas fa-chevron-left"></i> Back to all resources</router-link>
                    <form @submit.prevent="search()" class="w-full md:w-1/3 flex items-center group">
                        <input v-model="q"
                            type="text" 
                            placeholder="search" 
                            class="main-input w-full rounded-full">
                    </form>
                    <div class="flex justify-center flex-wrap items-center w-full md:w-1/3 mt-3 md:mt-0">
                        <h1 class="font-bold text-md md:text-xl mr-2">{{resource}}</h1>
                        <img :src="sourceInfo.img" :alt="resource" class="h-6 md:h-12">
                        <h3 class="ml-2">{{$filters.numberWithCommas(sourceInfo.count)}} Documents</h3>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex justify-center items-center">
                    <div class="h-32 w-[80%]" v-if="data">
                        <Chart :data="data" type="stacked-bar" name='By Source'></Chart>
                    </div>
                </div>
            </div>
            <!-- results -->
            <div class="min-h-screen max-w-xl m-auto highlight_container" :class="sourceInfo.text">
                <template v-for="(result, i) in results" :key="i">
                    <p class="mb-4 font-extrabold">
                        <span :class="sourceInfo.bg" class="p-1 rounded-xl text-white">{{result['@type']}}</span> {{result?.name}}
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import axios from 'axios';
import Mark from 'mark.js'

import Chart from '../components/Chart.vue'

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
        Chart
    },
    computed:{
        ...mapGetters([
            'baseURL',
            'results'
        ]),
        sourceInfo: function() {
            return this.$store.getters.getTheme(this.resource);
        },
    },
    methods:{
        drawChart(){
            let self = this;
            axios.get(this.baseURL + `?aggs=_index&q=@type:${this.resource}&size=0`).then(res=>{

                let data = {
                    labels: [self.resource],
                    datasets: []
                };

                let colors = ['#1F78B4', '#33A02C', '#6A3D9A', '#A6CEE3', '#B2DF8A', '#CAB2D6', '#E31A1C', '#FB9A99', '#FDBF6F', '#FF7F00']
                
                if( res.data?.facets?.['_index']?.terms){
                    res.data?.facets?.['_index']?.terms.forEach((termInfo, i) => {
                        //chart data for /About
                        data.datasets.push({
                            label: termInfo.term,
                            data: [termInfo.count],
                            backgroundColor: colors[i]
                        });
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
        }
    },
}
</script>
