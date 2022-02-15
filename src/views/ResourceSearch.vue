<template>
    <div class="w-full min-h-screen darkMode">
        <div class="relative w-full">
            <div class="w-full sticky top-0" :class="sourceInfo.bg">
                <div class="max-w-screen-xl m-auto flex justify-between items-center flex-wrap p-6 text-white">
                    <router-link to="/resources" class="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-200"><i class="fas fa-chevron-left"></i> Back to all resources</router-link>
                    <input type="text" class="rounded-full p-2 w-1/3" placeholder="search">
                    <div class="flex justify-around flex-wrap items-center space-x-4">
                        <h1 class="font-bold text-xl">{{resource}}</h1>
                        <img :src="sourceInfo.img" :alt="resource" class="h-12">
                        <h1>{{$filters.numberWithCommas(sourceInfo.count)}} Documents</h1>
                    </div>
                </div>
            </div>
            <div class="min-h-screen">
                <div class="flex justify-center items-center">
                    <div class="w-full h-32" v-if="data">
                        <Chart :data="data" type="stacked-bar" name='By Source'></Chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import axios from 'axios';

import Chart from '../components/Chart.vue'

export default {
    name: 'ResourceSearch',
    data: function(){
        return {
            data: null
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
                    labels: ['Sources'],
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
        }
    },
    mounted: function () {
        this.drawChart();
    }
}
</script>
