<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2  p-2 rounded">
        <template v-for="filter, i in filters['resourceTypeName.keyword']" :key="i + 'fil'">
            <div class="my-1 p-2 dark:bg-gray-800 bg-white rounded">
                <ExpandableSection>
                    <template v-slot:title>
                        <b class="text-sm select-none text-gray-700 dark:text-white">
                            <img :src="filter.img" class="w-4 inline" :alt="filter.term">
                            {{filter.term}} (<span class="text-accent">{{filter?.filters?.length || 0}}</span>)
                            <button 
                            @click="activateFilter(filter)" 
                            :class="[filter.active ? 'bg-green-500' : 'bg-gray-600']"
                            class="p-1 rounded-md text-white m-1">
                                {{filter.active ? 'ON' : 'OFF'}}
                            </button>
                        </b>
                    </template>
                    <template v-slot:value>
                        <div class="ml-3 space-y-1 bg-gray-100 text-gray-600 p-2 rounded" v-if="filter?.filters">
                            <div v-for="f,j in filter?.filters" :key="j + 'filter'">
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
        },
        handleSubmit(type, name){
            console.log('sub', type + name)
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