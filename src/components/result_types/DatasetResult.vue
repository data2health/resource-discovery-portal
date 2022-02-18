<template>
    <div class="w-full">
        <!-- Type -->
        <ResultTab :name="item?.['@type']" :theme="theme" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-1 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h5 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">
                        {{item?.title }} <span v-if="item?.version" class="text-gray-400 font-extralight">V.{{item?.version}}</span>
                    </router-link>
                </h5>
                <!-- published date -->
                <p v-if="item?.dateReleased" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(item?.dateReleased)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="item?.description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center flex-wrap">
                <!-- ID -->
                <template v-if="item?.ID" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>ID</template> 
                        <template v-slot:value>{{item?.ID}}</template>
                    </Pill>
                </template>
                <!-- status -->
                <template v-if="item?.privacy" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Privacy</template> 
                        <template v-slot:value>{{item?.privacy}}</template>
                    </Pill>
                </template>
                <!-- type -->
                <template v-if="item?.types">
                    <Pill :color="theme['bg']" v-for="type in item?.types" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <!-- stats box -->
                <div class="text-md font-regular p-2 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <!-- url -->
                        <p v-if="item?.url">
                            <a :href="item?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
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
                <div v-if="item?.keywords">
                    <small class="text-xs mr-2 text-gray-400" v-for="(tag, i) in item?.keywords" :key="tag + i">
                        <i class="fas fa-tag" :class="theme.text"></i> {{tag}}
                    </small>
                </div>
                <div v-if="fullView">
                    <template v-for="(val, field) in item" :key="field">
                        <FieldBox :content="val" :name="field" :isChild="false" :theme="theme"></FieldBox>
                    </template>
                </div>
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
    name: "DatasetResult",
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
        ...mapGetters([
            'expandedView'
        ]),
        result_type: function () {
            // deeper > shallow
            return this.item?.['@type'] 
        },
        theme: function() {
            return this.$store.getters.getTheme(this.item?.['@type']);
        },
        people: function(){
            if (this.item && this.item?.creators) {
                return this.item?.creators.map(item => item);
            }else{
                return false
            }
        },
    },
    mounted:function () {
        console.log("THEME", this.theme)
    }
}
</script>