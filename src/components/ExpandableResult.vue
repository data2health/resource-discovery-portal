<template>
    <!-- Type -->
    <ResultTab :name="result_type" :cls="[theme.bg]" ></ResultTab>
    <div :key="uniqueID" class="min-w-full flex justify-between border-2 border-gray-200 mb-5 shadow-lg p-3">
        <div class="w-full">
            <h1 class="text-lg font-bold cursor-pointer" @click.prevent="open = !open">{{title}}</h1>
            <div class="flex space-x-2 flex-wrap justify-start">
                <!-- method -->
                <template v-if="source?.method || source?.delivery_method" class="text-sm">
                    <div class="bg-gray-300 rounded px-3 py-1">
                        {{source?.method || source?.delivery_method}}
                    </div>
                </template>
                <!-- status -->
                <template v-if="source?.frequency" class="text-sm">
                    <div class="bg-gray-300 rounded px-3 py-1">
                        {{source?.frequency}}
                    </div>
                </template>
                <!-- type -->
                <template v-if="source?.types">
                    <div class="bg-gray-300 rounded px-3 py-1" v-for="type in source?.types" :key="type">
                        {{type}}
                    </div>
                </template>
                <!-- public -->
                <template v-if="source?.learning_level" class="text-sm">
                    <div class="bg-gray-300 rounded px-3 py-1">
                        {{source?.learning_level}}
                    </div>
                </template>
            </div>
            <div v-if="open || expandedView" class="bg-gray-200">
                <div class="flex justify-start p-2 space-x-2">
                    <i class="fas fa-external-link-square-alt"></i>
                    <i class="fas fa-envelope-square"></i>
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <!-- published date -->
                <p v-if="source?.created_at" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(source?.created_at)}}
                </p>
                <!-- updated date -->
                <p v-if="source?.updated_at" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> {{$filters.formatDate(source?.updated_at)}}
                </p>
                <template v-for="(item, field) in viewable_fields" :key="field">
                    <FieldBox :content="item" :name="field" :isChild="false" :theme="theme"></FieldBox>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import FieldBox from './FieldBox.vue'
import ResultTab from './ResultTab.vue'

export default {
    name: "ExpandableResult",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            open: false,
        }
    },
    props:{
        item: Object
    },
    components:{
        FieldBox,
        ResultTab
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        //root level of data, for readability
        source: function () {
            // deeper > shallow
            return this.item?._source?.raw?.attributes ? this.item?._source?.raw?.attributes : 
            this.item?._source?.raw ? this.item?._source?.raw : 
            this.item?._source?.tool ? this.item?._source?.tool : 
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
            else if (this.source?.toolName) {
                return this.source?.toolName
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
        },
        viewable_fields: function(){
            let allowed = ['description', 'id', 'keywords', 'tags',
            'player', 'published', 'created', 'author', 'abstract', 'url', 'curatedBy', 'doi'];
            let res = {};
            allowed.forEach(field => {
                if (Object.hasOwnProperty.call(this.source, field)) {
                    res[field] = this.source[field]
                }
            });
            return res;
        }
    }
}
</script>