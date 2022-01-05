<template>
    <div :key="uniqueID">
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" :index="item?._index"></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item?._id } }">{{title}}</router-link>
            </h5>
            <div class="flex justify-between">
                <!-- published date -->
                <p v-if="source?.published" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(source?.published)}}
                </p>
                <!-- updated -->
                <p v-if="source?.updated" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> {{$filters.formatDate(source?.updated)}}
                </p>
            </div>
            <!-- description -->
            <Description :text="description"></Description>
            <!-- only for Funding if full view -->
            <!-- <div class="text-sm my-1" v-if="source?.content?.html">
                <p class="mt-2" :class="theme.text">Additional Information:</p>
                <Description :text="source?.content?.html"></Description>
            </div> -->
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- ID -->
                <template v-if="source?.id" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template>
                        <template v-slot:value>{{source?.id}}</template>
                    </Pill>
                </template>
                <!-- Doc #-->
                <template v-if="source?.doc_num" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-passport"></i></template>
                        <template v-slot:value>{{source?.doc_num}}</template>
                    </Pill>
                </template>
            </div>
             <!-- stats box -->
            <div v-if="showDetails || source?.url" class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.url">
                        <a :href="source?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- curated -->
                    <template v-if="item?._source?.curatedBy">
                        <p :class="theme.text">Curated by:</p>
                        <a v-if="item?._source?.curatedBy?.url" :href="item?._source?.curatedBy?.url" target="_blank" rel="nonreferrer">
                            {{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}}) <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                        </a>
                        <p v-else>{{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}})</p>
                    </template>
                </div>
                <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-start">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <p v-if="source?.primary_ic" class="mb-1"><i class="fas fa-building" :class="theme.text"></i> {{source?.primary_ic}}</p>
                    </div>
                </div>
            </div>
            <!-- keywords -->
            <div v-if="keywords">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in keywords" :key="tag + i">
                    <i class="fas fa-tag" :class="theme.text"></i> {{tag}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import Description from '../ExpandableDescription.vue'
import ResultTab from '../ResultTab.vue'

export default {
    name: "DefaultResult",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            showDetails: false,
        }
    },
    components:{
        Description,
        ResultTab
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
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : '';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
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

            return this.item?._source?.description ? this.item?._source?.description :
            this.item?._source?.abstract ? this.item?._source?.abstract :
            this.source?.description ? this.source?.description :
            this.source?.abstract ? this.source?.abstract :
            this.source?.purpose ? this.source?.purpose : '';
        }
    }
}
</script>