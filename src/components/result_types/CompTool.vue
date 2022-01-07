<template>
    <div>
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">
                    {{title}} <span v-if="source?.version" class="text-gray-400 font-extralight">V.{{source?.version}}</span>
                </router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="description"></Description>
            <div class="text-sm my-1" v-if="source?.operation">
                <p class="mt-2" :class="theme.text">Operation:</p>
                <Description :text="source?.operation"></Description>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center flex-wrap">
                <!-- ID -->
                <template v-if="source?.toolId" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template>
                        <template v-slot:value>{{source?.toolId}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source?.toolType" class="text-sm">
                    <Pill :color="theme['bg']" v-for="type in source?.toolType" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
                <!-- language -->
                <template v-if="source?.language" class="text-sm">
                    <Pill :color="theme['bg']" v-for="type in source?.language" :key="type">
                        <template v-slot:title><i class="fas fa-code"></i></template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
                <!-- cost -->
                <template v-if="source?.cost" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-dollar-sign"></i></template>
                        <template v-slot:value>{{source?.cost}}</template>
                    </Pill>
                </template>
                <!-- accessibility -->
                <template v-if="source?.accessibility" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-lock"></i></template>
                        <template v-slot:value>{{source?.accessibility}}</template>
                    </Pill>
                </template>
                <!-- license-->
                <template v-if="source?.license" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-certificate"></i></template>
                        <template v-slot:value>{{source?.license}}</template>
                    </Pill>
                </template>
            </div>
            <div class="flex justify-items-stretch flex-nowrap justify-center text-xs">
                <!-- input -->
                <Popper content="Input" class="tip" :hover="true" placement="left" arrow>
                <div class="flex justify-center items-center p-2 rounded-l-2xl">
                    <div class="flex flex-col justify-items-stretch">
                        <p v-if="source?.inputFormat" class="bg-gray-300 p-2 rounded-t-2xl dark:bg-gray-700">
                            <span class="rounded-md text-gray-500 mr-1" v-for="item in source?.inputFormat" :key="item">
                                <i class="fas fa-file"></i> {{item}}
                            </span>
                        </p>
                        <p class="bg-gray-100 p-2 rounded-b-2xl dark:bg-gray-500">
                                <template v-if="source?.inputData">
                                <span class="rounded-md mr-1 dark:text-white" :class="theme.text" v-for="item in source?.inputData" :key="item">
                                    <i class="fas fa-circle"></i> {{item}}
                                </span>
                            </template>
                        </p>
                    </div>
                </div>
                </Popper>
                <!-- arrow -->
                <div class="flex justify-center items-center px-3">
                    <i class="fas fa-chevron-right fa-2x" :class="theme.text"></i>
                </div>
                <!-- output -->
                <Popper content="Output" class="tip" :hover="true" placement="right" arrow>
                <div class="flex justify-center items-center p-2 rounded-r-2xl">
                    <div class="flex flex-col justify-items-stretch">
                        <p v-if="source?.outputFormat" class="bg-gray-300 p-2 rounded-t-2xl dark:bg-gray-700">
                            <span class="rounded-md text-gray-500 mr-1" v-for="item in source?.outputFormat" :key="item">
                                <i class="fas fa-file"></i> {{item}}
                            </span>
                        </p>
                        <p class="bg-gray-100 p-2 rounded-b-2xl dark:bg-gray-500">
                                <template v-if="source?.outputData">
                                <span class="rounded-md mr-1 dark:text-white" :class="theme.text" v-for="item in source?.outputData" :key="item">
                                    <i class="fas fa-circle"></i> {{item}}
                                </span>
                            </template>
                        </p>
                    </div>
                </div>
                </Popper>
            </div>
            <!-- stats box -->
            <div v-if="showDetails || source?.homepage" class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-around items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.homepage" class="mb-1">
                        <a :href="source?.homepage" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- url -->
                    <p v-if="source?.downloadUrl" class="mb-1">
                        <a :href="source?.downloadUrl" target="_blank" rel="nonreferrer">Download <i class="fas fa-download" :class="theme.text"></i></a>
                    </p>
                </div>
                <!-- funding -->
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- consortium -->
                    <template v-if="source?.consortium" class="mb-1">
                        <p :class="theme.text">Consortiums:</p>
                        <p v-for="item in source?.consortium" :key="item">
                            {{item}}
                        </p>
                    </template>
                    <!-- grants -->
                    <template v-if="source?.grantName" class="mb-1">
                        <p :class="theme.text">Grants:</p>
                        <p v-for="item in source?.grantName" :key="item">
                            {{item}}
                        </p>
                    </template>
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
    name: "Tool",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            showDetails: false
        }
    },
    components:{
        Description,
        ResultTab
    },
    props:{
        item: Object,
        fullView: Boolean
    },
    computed:{
        // root level of data, for readability
        source: function () {
            return this.item?._source?.tool ? this.item?._source?.tool : this.item
        },
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : 'Tool';
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
            //nested level
            if (this.source?.toolName) {
                return this.source?.toolName
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