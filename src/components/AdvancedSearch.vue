<template>
    <a href="javascript:void(0);" class="font-bold text-sm" @click.prevent="as_open = !as_open"><i class="fas fa-cog"></i> Advanced Search</a>
    <!-- cookie consent -->
    <VModal v-model="as_open" @confirm="as_open = false">
        <template v-slot:title>
            <h2 class="text-main dark:text-white">
                <i class="fas fa-cog" :class="{'animate-spin': loading}"></i> Advanced Search <span class="text-center text-red-400" v-if="loading">Updating Results...</span>
            </h2>
        </template>
        <template v-slot:content>
            <div class="p-1 w-full space-y-4 dark:text-gray-200">
                <AdvancedFilters></AdvancedFilters>
                <!-- Filters -->
                <FilterList name="Filter by source" section="_index" :items="filters['_index']"></FilterList>
            </div>
        </template>
    </VModal>
</template>

<script>
import { mapGetters } from 'vuex'

import FilterList from '../components/FilterList.vue'
import AdvancedFilters from '../components/AdvancedFilters.vue'

export default {
    name: "AdvancedSearch",
    data: function(){
        return {
            as_open: false
        }
    },
    components:{
        FilterList,
        AdvancedFilters
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