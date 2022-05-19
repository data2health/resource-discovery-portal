<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2  p-2 rounded">
        <template v-for="filter, i in filters['resourceTypeName.keyword']" :key="i + 'fil'">
            <div class="my-1 p-2 rounded" :class="[filter.active ? filter.bg : 'dark:bg-gray-800 bg-white']">
                <ExpandableSection>
                    <template v-slot:title>
                        <h6 class="text-sm select-none text-gray-700 dark:text-white inline">
                            <img :src="filter.img" class="w-4 inline" :alt="filter.term">
                            {{filter.term}} (<span class="text-accent">{{filter?.filters?.length || 0}}</span>)
                            <input 
                            type="checkbox"
                            :checked='filter.active'
                            @click="activateFilter(filter)"
                            class="m-1 form-checkbox h-6 w-6 rounded text-green-500 cursor-pointer">
                        </h6>
                    </template>
                    <template v-slot:value>
                        <h2>Filters go here</h2>
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