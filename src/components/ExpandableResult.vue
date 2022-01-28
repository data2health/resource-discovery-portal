<template>
    <!-- Type -->
    <ResultTab :name="result_type" :theme="theme"></ResultTab>
    <div :key="uniqueID" class="min-w-full flex justify-between border-2 border-gray-200 dark:border-gray-500 mb-5 shadow-lg p-3 bg-gray-100 dark:bg-gray-600">
        <div class="w-full">
            <h1 class="text-lg font-bold cursor-pointer text-blue-500 hover:text-blue-400 dark:text-white" @click.prevent="open = !open">
                {{title}} <i class="fas text-gray-500 dark:text-tertiary-light" :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
            </h1>
            <template v-if="open || expandedView">
                <div class="flex justify-start items-center p-2 space-x-4">
                    <div class="bg-tertiary text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm">
                        source <i class="fas fa-external-link-square-alt"></i>
                    </div>
                    <div class="bg-tertiary text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm">
                        metadata <i class="fas fa-newspaper"></i>
                    </div>
                    <div class="bg-tertiary text-white rounded-full px-3 py-1 cursor-pointer hover:bg-tertiary-light text-sm">
                        share <i class="fas fa-share"></i>
                    </div>
                </div>
            </template>
            <div class="flex space-x-2 flex-wrap justify-start my-2">
                <!-- method -->
                <template v-if="source?.method || source?.delivery_method">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{source?.method || source?.delivery_method}}
                    </div>
                </template>
                <!-- status -->
                <template v-if="source?.frequency">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{source?.frequency}}
                    </div>
                </template>
                <!-- type -->
                <template v-if="source?.types">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg" v-for="type in source?.types" :key="type">
                        {{type}}
                    </div>
                </template>
                <!-- public -->
                <template v-if="source?.learning_level">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{source?.learning_level}}
                    </div>
                </template>
            </div>
            <div v-if="open || expandedView" class="bg-gray-200 dark:bg-gray-700">
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
            return this.item?._source?.tool ? this.item?._source?.tool : this.item;
        },
        result_type: function () {
            // deeper > shallow
            return this.source?.entity ? this.source?.entity : 
            this.source?.['@type'] ? this.ource?.['@type'] : '';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
        title: function () {

            if (this.source?.toolName) {
                return this.source?.toolName
            }
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
            return this.source?.description ? this.source?.description :
            this.source?.abstract ? this.source?.abstract :
            this.source?.purpose ? this.source?.purpose : '';
        },
        viewable_fields: function(){
            let allowed = ['description', 'id', 'keywords', 'tags',
            'player', 'published', 'created', 'author', 'abstract', 'url', 'curatedBy', 'doi', 'abstract'];
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