<template>
    <div>
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fas fa-newspaper text-orange-500"></i> Dataset</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h5 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">
                        {{source?.dataset?.title }} <span v-if="source?.dataset?.version" class="text-gray-400 font-extralight">V.{{source?.dataset?.version}}</span>
                    </router-link>
                </h5>
                <!-- published date -->
                <p v-if="source && source?.dataset?.dateReleased" class="text-sm">
                    <i class="fas fa-book text-orange-500"></i> {{$filters.formatDate(source?.dataset?.dateReleased)}}
                </p>
            </div>
            <!-- description -->
            <Description :text="source?.dataset?.description"></Description>
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- ID -->
                <template v-if="source && source?.dataset?.ID" class="text-sm">
                    <Pill color="bg-orange-500">
                        <template v-slot:title>ID</template> 
                        <template v-slot:value>{{source?.dataset?.ID}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="source && source?.dataset?.privacy" class="text-sm">
                    <Pill color="bg-orange-500">
                        <template v-slot:title>Privacy</template> 
                        <template v-slot:value>{{source?.dataset?.privacy}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source && source?.dataset?.types">
                    <Pill color="bg-orange-500" v-for="type in source?.dataset?.types" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
            </div>
            <!-- stats box -->
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.dataset?.url">
                        <a :href="source?.dataset?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt text-orange-500"></i></a>
                    </p>
                    <!-- people -->
                    <template v-if="people">
                        <p class="text-orange-500 mt-2">Creators:</p>
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
                </div>
            </div>
            <div v-if="source?.dataset?.keywords">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in source?.dataset?.keywords" :key="tag + i">
                    <i class="fas fa-tag text-orange-500"></i> {{tag}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>

import Description from '../ExpandableDescription.vue'

export default {
    name: "DatasetResult",
    props:{
        item: Object
    },
    components:{
        Description
    },
    computed:{
        // root level of data, for readability
        source: function () {
            if (this.item?._source?.raw?._source) {
                return this.item?._source?.raw?._source
            }else{
                return this.item
            }
        },
        people: function(){
            if (this.item && this.source?.dataset?.creators) {
                return this.source?.dataset?.creators.map(item => item);
            }else{
                return false
            }
        },
    }
}
</script>