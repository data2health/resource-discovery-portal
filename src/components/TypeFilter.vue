<template>
    <div class="flex justify-center items-center overflow-scroll p-3 bg-gray-100 dark:bg-gray-800 w-full flex-wrap">
        <template v-for="(info, type) in resourceTypes" :key="type + 'f'">
            <button 
            @click="activateTypeFilter(type)"
            :class="info?.active ? 'text-white bg-tertiary hover:bg-tertiary-light' : 
            'bg-main dark:bg-secondary dark:hover:bg-secondary-light text-white hover:bg-main-light'"
            class="shadow-sm hover:shadow-md px-4 py-1 text-center 
            m-1 rounded-lg transition-all duration-300 text-xs md:text-sm">
                {{type}}
            </button>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'TypeFilter',
    data: function() {
        return {
            
        }
    },
    methods:{
        activateTypeFilter (type){
            this.$store.commit('activateTypeFilter', {'value': type});
        }
    },
    computed:{
        ...mapGetters([
            'resourceTypes'
        ])
    },
}
</script>