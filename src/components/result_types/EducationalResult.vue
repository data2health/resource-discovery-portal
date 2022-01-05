<template>
    <div>
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" :index="item?._index"></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wmethode mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h2 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">
                        {{source?.label }} <span v-if="source?.version" class="text-gray-400 font-extralight">V.{{source?.version}}</span>
                    </router-link>
                </h2>
                <!-- published date -->
                <p v-if="source?.dateReleased" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(source?.dateReleased)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="description"></Description>
            <div class="text-sm my-1" v-if="source?.subject_area">
                <h3 class="mt-2" :class="theme.text">Subject:</h3>
                <Description :text="source?.subject_area"></Description>
            </div>
            <div class="text-sm my-1" v-if="source?.objective">
                <h3 class="mt-2" :class="theme.text">Objective:</h3>
                <Description :text="source?.objective"></Description>
            </div>
            <div class="text-sm my-1" v-if="source?.learning_objectives">
                <h3 class="mt-2" :class="theme.text">Learning Objectives:</h3>
                <Description :text="source?.learning_objectives"></Description>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-around items-center">
                <!-- method -->
                <template v-if="source?.method || source?.delivery_method" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Method</template> 
                        <template v-slot:value>{{source?.method || source?.delivery_method}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="source?.frequency" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Frequency</template> 
                        <template v-slot:value>{{source?.frequency}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source?.types">
                    <Pill :color="theme['bg']" v-for="type in source?.types" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
                <!-- cost -->
                <template v-if="source?.cost_to_access" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Cost</template> 
                        <template v-slot:value>{{source?.cost_to_access}}</template>
                    </Pill>
                </template>
                <!-- public -->
                <template v-if="source?.public" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Public</template> 
                        <template v-slot:value>{{source?.public}}</template>
                    </Pill>
                </template>
                <!-- public -->
                <template v-if="source?.learning_level" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Level</template> 
                        <template v-slot:value>{{source?.learning_level}}</template>
                    </Pill>
                </template>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">MORE INFO</h1>
            </div>
            <!-- stats box -->
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="source?.url">
                        <a :href="source?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- people -->
                    <template v-if="people">
                        <p class="mt-2" :class="theme.text">Creators:</p>
                        <!-- short list -->
                        <template v-if="people.length < 11">
                            <small class="mb-1" v-for="(official, i) in people" :key="official">
                                {{official}} <span v-if="i < people.length-1">, </span>
                            </small>
                        </template>
                        <!-- long hover -->
                        <template v-else>
                            <Popper :content="JSON.stringify(people)" class="tip" :hover="true" placement="right" arrow>
                                <span>(<span :class="theme.text">{{people.length}}</span>) creators</span>
                            </Popper>
                        </template>
                    </template>
                    <!-- people -->
                    <template v-if="source?.institution">
                        <p class="mt-2" :class="theme.text">Institution:</p>
                        <p>{{source?.institution}}</p>
                    </template>
                </div>
                <!-- right box -->
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <p class="mb-1" v-if="source?.target_learners"><i class="fas fa-bullseye" :class="theme.text"></i> {{source?.target_learners}}</p>
                </div>
            </div>
            <div v-if="keywords">
                <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in keywords" :key="tag + i">
                    <i class="fas fa-tag" :class="theme.text"></i> {{tag}}
                </small>
            </div>
            <template v-if="fullView">
                <template v-for="(item, field) in source" :key="field">
                    <FieldBox :content="item" :name="field" :isChild="false" :theme="theme"></FieldBox>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import ResultTab from '../ResultTab.vue'
import Description from '../ExpandableDescription.vue'
import FieldBox from '../FieldBox.vue'

export default {
    name: "EducationalResult",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        Description,
        ResultTab,
        FieldBox
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
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
        people: function(){
            if (this.item && this.source?.creators) {
                return this.source?.creators.map(item => item);
            }else{
                return false
            }
        },
        description: function (){
            return this.item?._source?.description ? this.item?._source?.description :
            this.item?._source?.abstract ? this.item?._source?.abstract :
            this.source?.description ? this.source?.description :
            this.source?.abstract ? this.source?.abstract :
            this.source?.purpose ? this.source?.purpose : '';
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
    }
}
</script>