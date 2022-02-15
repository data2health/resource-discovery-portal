<template>
    <!-- Type -->
    <ResultTab :name="item?.['@type'] || 'N/A'" :theme="theme"></ResultTab>
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
                    <router-link class="bg-green-500 !text-white rounded-full px-3 py-1 cursor-pointer hover:bg-green-400 text-sm" 
                    :to="{ name: 'ResultDetails', query: {'resource': item._id} }">more info</router-link>
                </div>
            </template>
            <div class="flex space-x-2 flex-wrap justify-start my-2">
                <!-- method -->
                <template v-if="item?.method || item?.delivery_method">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{item?.method || item?.delivery_method}}
                    </div>
                </template>
                <!-- status -->
                <template v-if="item?.frequency">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{item?.frequency}}
                    </div>
                </template>
                <!-- type -->
                <template v-if="item?.types">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg" v-for="type in item?.types" :key="type">
                        {{type}}
                    </div>
                </template>
                <!-- public -->
                <template v-if="item?.learning_level">
                    <div class="text-white banner-clip pr-3 pl-5 py-1 text-xs" :class="theme.bg">
                        {{item?.learning_level}}
                    </div>
                </template>
            </div>
            <div v-if="open || expandedView" class="bg-gray-200 dark:bg-gray-700">
                <!-- published date -->
                <p v-if="item?.created_at" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(item?.created_at)}}
                </p>
                <!-- updated date -->
                <p v-if="item?.updated_at" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> {{$filters.formatDate(item?.updated_at)}}
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
        theme: function() {
            return this.$store.getters.getTheme(this.item?.['@type']);
        },
        title: function () {
            let possibleFields = ['title', 'name', 'toolName', 'article_title', 'label'];

            let match =  possibleFields.find( field => {
                if (field in this.item && this.item[field] !== null) {
                    return true
                }
            });
            //match is string
            if (typeof this.item[match] == 'string') {
                return this.item[match];
            }
            // match was nested in object eg. article.title['article_title']
            else if (typeof this.item[match] == 'object') {
                for (const key in this.item[match]) {
                    if (typeof this.item[match][key] == 'string') {
                        return this.item[match][key];
                    }
                }
            }
            //last resort
            else{
                return this.result_type + ' info'
            }
        },
        description: function (){
            return this.item?.description ? this.item?.description :
            this.item?.abstract ? this.item?.abstract :
            this.item?.purpose ? this.item?.purpose : '';
        },
        viewable_fields: function(){
            let allowed = ['description', 'id', 'keywords', 'tags',
            'player', 'published', 'created', 'author', 'abstract', 'url', 'curatedBy', 'doi', 'abstract'];
            let res = {};
            allowed.forEach(field => {
                if (Object.hasOwnProperty.call(this.item, field)) {
                    res[field] = this.item[field]
                }
            });
            return res;
        }
    }
}
</script>