<template>
    <div class="flex flex-wrap justify-center items-center pb-1">
        <template v-for="(items, section) in filters" :key="section">
            <template v-for="filter in items" :key="filter.term">
                <button v-if="filter.active" 
                @click="deActivateFilter(section, filter)"
                :class="filter.bg"
                class="text-gray-500 dark:text-gray-200 m-1 rounded-full px-2 py-1 text-xs group">
                    {{filter.name || filter.term}} <i class="fas fa-times group-hover:text-red-400"></i>
                </button>
            </template>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Chips',
    methods:{
        deActivateFilter(section, filter){
            this.$store.dispatch('activateFilter', {'section': section, 'filter': filter});
        }
    },
    computed:{
        ...mapGetters([
            'filters'
        ]),
    }
}
</script>