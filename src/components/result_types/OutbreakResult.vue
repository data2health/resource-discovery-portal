<template>
    <div>
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <div class="flex justify-between flex-wrap">
                <h5 class="text-lg font-semibold">
                    <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{item._source.name}}</router-link>
                </h5>
                <!-- published date -->
                <p v-if="item && item?._source?.datePublished" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(item?._source?.datePublished)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="item?._source?.abstract"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-start items-center">
                <!-- type -->
                <template v-if="item && item?._source?.publicationType">
                    <!-- pill -->
                    <Pill :color="theme['bg']" v-for="type in item._source.publicationType" :key="type">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{type}}</template>
                    </Pill>
                </template>
                <!-- DOI -->
                <template v-if="item && item?._source?.doi" class="text-sm">
                    <!-- pill -->
                    <Pill :color="theme['bg']">
                        <template v-slot:title>DOI</template>
                        <template v-slot:value>{{item?._source?.doi}}</template>
                    </Pill>
                </template>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <!-- stats box -->
                <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                    <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                        <!-- curated -->
                        <template v-if="item?._source?.curatedBy">
                            <p :class="theme.text">Curated by:</p>
                            <a v-if="item?._source?.curatedBy?.url" :href="item?._source?.curatedBy?.url" target="_blank" rel="nonreferrer">
                                {{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}}) <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                            </a>
                            <p v-else>{{item?._source?.curatedBy?.name}} ({{$filters.formatDate(item?._source?.curatedBy?.curationDate)}})</p>
                        </template>
                        <!-- authors -->
                        <template v-if="authors || authorsByInstitution">
                            <p class="mt-2" :class="theme.text">Authors:</p>
                            <!-- if by institution -->
                            <template v-if="authorsByInstitution">
                                <p v-for="(authors, institution) in authorsByInstitution" :key="institution" class="mb-2">
                                    <Popper :content="JSON.stringify(authors)" class="tip" :hover="true" placement="right" arrow>
                                        <span>(<span :class="theme.text">{{authors.length}}</span>) </span>
                                    </Popper>
                                    {{institution}}
                                </p>
                            </template>
                            <!-- else list them-->
                            <template v-else-if="authors">
                                <!-- short list -->
                                <template v-if="authors.length < 11">
                                    <small class="mb-1" v-for="(author, i) in authors" :key="author">
                                        {{author}} <span v-if="i < authors.length-1">, </span>
                                    </small>
                                </template>
                                <!-- long hover -->
                                <template v-else>
                                    <Popper :content="JSON.stringify(authors)" class="tip" :hover="true" placement="right" arrow>
                                        <span>(<span :class="theme.text">{{authors.length}}</span>) authors</span>
                                    </Popper>
                                </template>
                            </template>
                        </template>
                    </div>
                </div>
            </template>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ResultTab from '../ResultTab.vue'
import Description from '../ExpandableDescription.vue'

export default {
    name: "OutbreakResult",
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
        authors: function(){
            if (this.item && this.item?._source?.author) {
                return this.item?._source?.author.map(item => item.name);
            }else{
                return false
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
        authorsByInstitution: function(){
            let res = {};
            if (this.item && this.item?._source?.author) {
                this.item?._source?.author.forEach(item => {
                    if( Object.hasOwnProperty.call(item, 'affiliation')){
                        item.affiliation.forEach(aff => {
                            if (Object.hasOwnProperty.call(aff, 'name')) {
                                if (!Object.hasOwnProperty.call(res, aff.name)) {
                                    res[aff.name] = [item.name];
                                }else{
                                    res[aff.name].push(item.name);
                                }
                            }
                        });
                    }
                });
            return Object.keys(res).length ? res : false;
            }else{
                return false
            }
        },
        outbreak_type: function(){
            if (this.item && this.item?._source?.['@type']) {
                return this.item?._source?.['@type']
            }else{
                return 'Outbreak.info'
            }
        },
    }
}
</script>