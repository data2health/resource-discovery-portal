<template>
    <div>
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3>
                <span class="capitalize">
                    <i :class="[theme.icon, theme.text]"></i> {{result_type}}
                </span>
            </h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.name || item._source.label}}</router-link>
            </h5>
            <!-- description -->
            <Description :text="item?._source?.official_title"></Description>
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- status -->
                <template v-if="item && item?._source?.overall_status" class="text-sm">
                    <!-- pill -->
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Status</template> 
                        <template v-slot:value>{{item?._source?.overall_status}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="item && item?._source?.study_type" class="text-sm">
                    <!-- pill -->
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{item?._source?.study_type}}</template>
                    </Pill>
                </template>
                <!-- phase -->
                <template v-if="item && item?._source?.phase">
                    <!-- pill -->
                    <Pill :color="theme['bg']" v-for="phase in item._source.phase" :key="phase">
                        <template v-slot:title>Phase</template>
                        <template v-slot:value>{{phase?.phase}}</template>
                    </Pill>
                </template>
            </div>
            <!-- stats box -->
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="item?._source?.url">
                        <a :href="item?._source?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- overall_officials -->
                    <template v-if="overall_officials">
                        <p class="mt-2" :class="theme.text">Officials:</p>
                        <!-- short list -->
                        <template v-if="overall_officials.length < 11">
                            <small class="mb-1" v-for="(official, i) in overall_officials" :key="official">
                                {{official}} <span v-if="i < overall_officials.length-1">, </span>
                            </small>
                        </template>
                        <!-- long hover -->
                        <template v-else>
                            <Popper :content="JSON.stringify(overall_officials)" class="tip" :hover="true" placement="right" arrow>
                                <span>(<span :class="theme.text">{{overall_officials.length}}</span>) overall_officials</span>
                            </Popper>
                        </template>
                    </template>
                </div>
            </div>
            <div v-if="item?._source?.keyword">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in item?._source?.keyword" :key="tag + i">
                    <i class="fas fa-tag" :class="theme.text"></i> {{tag?.keyword}}
                </small>
            </div>
        </div>
    </div>
</template>

<script>

import Description from '../ExpandableDescription.vue'

export default {
    name: "ClinicalTrialResult",
    props:{
        item: Object
    },
    components:{
        Description
    },
    computed:{
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
        overall_officials: function(){
            if (this.item && this.item?._source?.overall_official) {
                return this.item?._source?.overall_official.map(item => item.overall_official_name);
            }else{
                return false
            }
        },
    }
}
</script>