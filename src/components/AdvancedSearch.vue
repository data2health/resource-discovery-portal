<template>
    <a href="javascript:void(0);" class="font-bold" @click.prevent="as_open = !as_open"><i class="fas fa-cog"></i> Advanced Search</a>
    <!-- cookie consent -->
    <VModal v-model="as_open" @confirm="as_open = false">
        <template v-slot:title>
            <h2 class="text-main">
                <i class="fas fa-cog"></i> Advanced Search <span class="text-center text-red-400" v-if="loading">Updating Results...</span>
            </h2>
        </template>
        <template v-slot:content>
            <div class="p-1 w-full space-y-4">
                <!-- Types -->
                <TypeFilter></TypeFilter>
                <!-- Detailed Filters -->
                <template v-for="(filters, type) in typeFilters" :key="type">
                    <div>
                        <h2>{{type}}</h2>
                        <template v-for="f in filters" :key="f">
                            <input type="checkbox" :id="type + '-' + f.name" class="focus:ring-green-200 checked:!bg-emerald-600 p-2 rounded-full">
                            <label class="ml-2" :for="type + '-' + f.name">{{f.name}}</label>
                        </template>
                    </div>
                </template>
                <!-- Filters -->
                <FilterList type="checkbox" name="Filter by source" section="_index" :items="filters['_index']"></FilterList>
                <FilterList type="checkbox" name="Filter by entity type" section="@type" :items="filters['@type']"></FilterList>
            </div>
        </template>
    </VModal>
</template>

<script>
import { mapGetters } from 'vuex'

import FilterList from '../components/FilterList.vue'
import TypeFilter from '../components/TypeFilter.vue'

export default {
    name: "AdvancedSearch",
    data: function(){
        return {
            as_open: false
        }
    },
    components:{
        FilterList,
        TypeFilter
    },
    computed:{
        ...mapGetters([
            'filters',
            'loading',
            'typeFilters'
        ]),
    }
}
</script>