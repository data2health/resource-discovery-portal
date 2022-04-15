<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2  p-2 rounded">
        <template v-for="filter, i in filters['resourceTypeName.keyword']" :key="i + 'fil'">
            <div v-if="filter?.filters" class="my-1 p-2 rounded" :class="[filter.active ? filter.bg : 'dark:bg-gray-800 bg-white']">
                <ExpandableSection>
                    <template v-slot:title>
                        <b class="text-sm select-none text-gray-700 dark:text-white">
                            <img :src="filter.img" class="w-4 inline" :alt="filter.term">
                            {{filter.term}} (<span class="text-accent">{{filter?.filters?.length || 0}}</span>)
                            <input 
                            type="checkbox"
                            :checked='filter.active'
                            @click="activateFilter(filter)"
                            class="m-1 form-checkbox h-6 w-6 rounded text-green-500">
                        </b>
                    </template>
                    <template v-slot:value>
                        <div class="ml-3 space-y-1 bg-gray-100/60 text-gray-600 p-2 rounded" v-if="filter?.filters">
                            <div v-if="!filter.active" class="text-xs">
                                Check resource type checkbox to activate filters
                            </div>
                            <div v-for="f,j in filter?.filters" :key="j + 'filter'" class="text-sm">
                                <input 
                                :disabled="!filter.active" 
                                :checked="f.active"
                                type="checkbox" 
                                :id="f.name" 
                                :name="f.name" 
                                :class="[!filter.active ? 'bg-gray-500 cursor-not-allowed' : 'bg-white cursor-pointer']"
                                class="focus:ring-0 checked:!bg-accent-dark rounded border-gray-400 group-hover:border-accent-light mr-2"
                                @change="handleSubmit(filter.term, f.name)">
                                <label 
                                :class="[!filter.active ? 'cursor-not-allowed' : 'cursor-pointer']"
                                :for="f.name">{{f.name}}</label>
                            </div>
                        </div>
                    </template>
                </ExpandableSection>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "AdvancedFilters",
    data: function(){
        return {
            open: false
        }
    },
    methods:{
        activateFilter (type){
            this.$store.dispatch('activateFilter', {'section': 'resourceTypeName.keyword', 'filter': type});
            this.$store.dispatch('search');
        },
        handleSubmit(type, name){
            // console.log('sub', type + name)
            this.$store.dispatch('activateSubFilter', {'section': 'resourceTypeName.keyword', 'resourceType': type, 'filterName': name});
        }
    },
    computed:{
        ...mapGetters([
            'filters',
        ]),
    }
}
</script>