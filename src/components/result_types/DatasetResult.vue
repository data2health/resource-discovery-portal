<template>
    <div>
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h5 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">
                        {{source?.dataset?.title }} <span v-if="source?.dataset?.version" class="text-gray-400 font-extralight">V.{{source?.dataset?.version}}</span>
                    </router-link>
                </h5>
                <!-- published date -->
                <p v-if="source?.dataset?.dateReleased" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(source?.dataset?.dateReleased)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="source?.dataset?.description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center">
                <!-- ID -->
                <template v-if="source?.dataset?.ID" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template> 
                        <template v-slot:value>{{source?.dataset?.ID}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="source?.dataset?.privacy" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Privacy</template> 
                        <template v-slot:value>{{source?.dataset?.privacy}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="source?.dataset?.types">
                    <Pill :color="theme['bg']" v-for="type in source?.dataset?.types" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <!-- stats box -->
                <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <!-- url -->
                        <p v-if="source?.dataset?.url">
                            <a :href="source?.dataset?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
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
                    </div>
                </div>
                <div v-if="source?.dataset?.keywords">
                    <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in source?.dataset?.keywords" :key="tag + i">
                        <i class="fas fa-tag" :class="theme.text"></i> {{tag}}
                    </small>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Description from '../ExpandableDescription.vue'
import ResultTab from '../ResultTab.vue'

export default {
    name: "DatasetResult",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        Description,
        ResultTab
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        // root level of data, for readability
        source: function () {
            if (this.item?._source?.raw?._source) {
                return this.item?._source?.raw?._source
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
            if (this.item && this.source?.dataset?.creators) {
                return this.source?.dataset?.creators.map(item => item);
            }else{
                return false
            }
        },
    }
}
</script>