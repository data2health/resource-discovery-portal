<template>
    <div>
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fas fa-apple-alt text-pink-500"></i> Education</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wmethode mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h5 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', params: {result_method: item._method } }">
                        {{source?.label }} <span v-if="source?.version" class="text-gray-400 font-extralight">V.{{source?.version}}</span>
                    </router-link>
                </h5>
                <!-- published date -->
                <p v-if="source && source?.dateReleased" class="text-sm">
                    <i class="fas fa-book text-pink-500"></i> {{$filters.formatDate(source?.dateReleased)}}
                </p>
            </div>
            <!-- description -->
            <Description :text="source?.description"></Description>
            <div class="text-sm my-1" v-if="source?.objective">
                <p class="text-pink-500 mt-2">Objective:</p>
                <Description :text="source?.objective"></Description>
            </div>
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- method -->
                <template v-if="source && source?.method" class="text-sm">
                    <Pill color="bg-pink-500">
                        <template v-slot:title>Method</template> 
                        <template v-slot:value>{{source?.method}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="source && source?.frequency" class="text-sm">
                    <Pill color="bg-pink-500">
                        <template v-slot:title>Frequency</template> 
                        <template v-slot:value>{{source?.frequency}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source && source?.types">
                    <Pill color="bg-pink-500" v-for="type in source?.types" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
            </div>
            <!-- stats box -->
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.url">
                        <a :href="source?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt text-pink-500"></i></a>
                    </p>
                    <!-- people -->
                    <template v-if="people">
                        <p class="text-pink-500 mt-2">Creators:</p>
                        <!-- short list -->
                        <template v-if="people.length < 11">
                            <small class="mb-1" v-for="(official, i) in people" :key="official">
                                {{official}} <span v-if="i < people.length-1">, </span>
                            </small>
                        </template>
                        <!-- long hover -->
                        <template v-else>
                            <Popper :content="JSON.stringify(people)" class="tip" :hover="true" placement="right" arrow>
                                <span>(<span class="text-green-500">{{people.length}}</span>) creators</span>
                            </Popper>
                        </template>
                    </template>
                    <!-- people -->
                    <template v-if="source?.institution">
                        <p class="text-pink-500 mt-2">Institution:</p>
                        <p>{{source?.institution}}</p>
                    </template>
                </div>
            </div>
            <div v-if="source?.keywords">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in source?.keywords" :key="tag + i">
                    <i class="fas fa-tag text-pink-500"></i> {{tag}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>

import Description from '../ExpandableDescription.vue'

export default {
    name: "EducationalResult",
    props:{
        item: Object
    },
    components:{
        Description
    },
    computed:{
        // root level of data, for readability
        source: function () {
            if (this.item?._source) {
                return this.item?._source
            }else{
                return this.item
            }
        },
        people: function(){
            if (this.item && this.source?.creators) {
                return this.source?.creators.map(item => item);
            }else{
                return false
            }
        },
    }
}
</script>