<template>
    <div :key="uniqueID">
        <!-- Type -->
        <ResultTab :name="item?.['@type'] || 'N/A'" :theme="theme" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2 w-full">
            <!-- SHRUNK VIEW -->
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{title}}</router-link>
            </h5>
            <div class="flex justify-between p-2 dark:text-gray-200">
                <!-- published date -->
                <p v-if="item?.published" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(item?.published)}}
                </p>
                <!-- updated -->
                <p v-if="item?.updated" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> {{$filters.formatDate(item?.updated)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center flex-wrap">
                <!-- ID -->
                <template v-if="item?.id" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template>
                        <template v-slot:value>{{item?.id}}</template>
                    </Pill>
                </template>
                <!-- Doc #-->
                <template v-if="item?.doc_num" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-passport"></i></template>
                        <template v-slot:value>{{item?.doc_num}}</template>
                    </Pill>
                </template>
            </div>
            <!-- EXPANDED VIEW -->
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <!-- Full View Headers -->
                <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                    <h1 class="font-light">MORE INFO</h1>
                </div>
                <!-- stats box -->
                <div v-if="showDetails || item?.url" class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <!-- url -->
                        <p v-if="item?.url">
                            <a :href="item?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
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
                            <p v-if="item?.primary_ic" class="mb-1"><i class="fas fa-building" :class="theme.text"></i> {{item?.primary_ic}}</p>
                        </div>
                    </div>
                </div>
                <!-- keywords -->
                <div v-if="keywords">
                    <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in keywords" :key="tag + i">
                        <i class="fas fa-tag" :class="theme.text"></i> {{tag}}
                    </small>
                </div>
                <!-- only for Funding if full view -->
                <template v-if="item?.content?.html && fullView">
                    <div class="dark:text-gray-300" v-html="item?.content?.html"></div>
                </template>
                <template v-if="fullView">
                    <template v-for="(val, field) in item" :key="field">
                        <FieldBox :content="val" :name="field" :isChild="false" :theme="theme"></FieldBox>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Description from '../ExpandableDescription.vue'
import ResultTab from '../ResultTab.vue'
import FieldBox from '../FieldBox.vue'

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
        ResultTab,
        FieldBox
    },
    props:{
        item: Object,
        fullView: Boolean
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        theme: function() {
            return this.$store.getters.getTheme(this.item?.['@type']);
        },
        keywords: function () {
            let res = [];
            //find field with keywords
            let keywords = this.item?.topic ? this.item?.topic : this.item?.keywords ?
            this.item?.keywords : this.item?.tag ? this.item?.tag : false;
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
            else if (this.item?.label) {
                return this.item?.label
            }
            else if (this.item?.title) {
                return this.item?.title
            }
            else if (this.item?.name) {
                return this.item?.name
            }
        },
        description: function (){

            return this.item?._source?.description ? this.item?._source?.description :
            this.item?._source?.abstract ? this.item?._source?.abstract :
            this.item?.description ? this.item?.description :
            this.item?.abstract ? this.item?.abstract :
            this.item?.purpose ? this.item?.purpose : '';
        }
    }
}
</script>