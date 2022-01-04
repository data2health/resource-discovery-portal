<template>
    <div>
        <!-- Type -->
        <div class="p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3 class="flex justify-between dark:text-gray-500">
                <span><i class="fas fa-laptop text-cyan-500"></i> Default</span>
                <img class="h-5 mr-5" src="../../../assets/img/rdp_color.svg" alt="logo" >
            </h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item?._id } }">{{title}}</router-link>
            </h5>
            <!-- description -->
            <Description :text="description"></Description>
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- ID -->
                <template v-if="source?.id" class="text-sm">
                    <Pill color="bg-sky-700">
                        <template v-slot:title>ID</template>
                        <template v-slot:value>{{source?.id}}</template>
                    </Pill>
                </template>
            </div>
             <!-- stats box -->
            <div v-if="showDetails || source?.url" class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.url">
                        <a :href="source?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt text-cyan-500"></i></a>
                    </p>
                    <!-- curated -->
                    <template v-if="item?._source?.curatedBy">
                        <p class="text-sky-700">Curated by:</p>
                        <a v-if="item?._source?.curatedBy?.url" :href="item?._source?.curatedBy?.url" target="_blank" rel="nonreferrer">
                            {{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}}) <i class="fas fa-external-link-square-alt text-sky-700"></i>
                        </a>
                        <p v-else>{{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}})</p>
                    </template>
                </div>
            </div>
            <!-- keywords -->
            <div v-if="keywords">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in keywords" :key="tag + i">
                    <i class="fas fa-tag text-cyan-500"></i> {{tag}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import Description from '../ExpandableDescription.vue'

export default {
    name: "DefaultResult",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            showDetails: false
        }
    },
    components:{
        Description
    },
    props:{
        item: Object,
    },
    computed:{
        // root level of data, for readability
        source: function () {
            // deeper > shallow
            return this.item?._source?.raw?.attributes ? this.item?._source?.raw?.attributes : 
            this.item?._source?.raw ? this.item?._source?.raw : 
            this.item?._source ? this.item?._source : this.item;
        },
        keywords: function () {
            let res = [];
            //find field with keywords
            let keywords = this.source?.topic ? this.source?.topic : this.source?.keywords ?
            this.source?.keywords : this.source?.tag ? this.source?.tag : false;
            //parse keywords
            if (keywords) {
                if (Array.isArray(keywords)) {
                    //check if values are objs
                    keywords.forEach((item) => {
                        if (typeof item == 'string') {
                            res.push(item);
                        }else{
                            Object.values(item).forEach(val => res.push(val));
                        }
                    });
                    return res;
                }else{
                    //string
                    return keywords.split(',');
                }
            }else {
                return false
            }
            
        },
        title: function () {
            // top level
            if (this.item?._source?.label) {
                return this.item?._source?.label
            }
            else if (this.item?._source?.title) {
                return this.item?._source?.title
            }
            else if (this.item?._source?.name) {
                return this.item?._source?.name
            }
            //nested level
            else if (this.source?.label) {
                return this.source?.label
            }
            else if (this.source?.title) {
                return this.source?.title
            }
            else if (this.source?.name) {
                return this.source?.name
            }
        },
        description: function (){
            // top level
            if (this.item?._source?.description) {
                return this.item?._source?.description
            }
            else if (this.item?._source?.abstract) {
                return this.item?._source?.abstract
            }
            //nested level
            else if (this.source?.description) {
                return this.source?.description
            }
            else if (this.source?.abstract) {
                return this.source?.abstract
            }
        }
    }
}
</script>