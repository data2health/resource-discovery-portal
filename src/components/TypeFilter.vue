<template>
    <div class="flex justify-center items-center overflow-scroll p-3 bg-gray-100 dark:bg-gray-800 w-full">
        <template v-for="(info, type) in resourceTypes" :key="type + 'f'">
            <button 
            @click="activateTypeFilter(type)"
            :class="info?.active ? 'text-white bg-main hover:bg-main-light' : 'bg-white text-main hover:bg-gray-100'"
            class="shadow-sm hover:shadow-md px-4 py-1 text-center 
            m-1 rounded-full transition-all duration-300">
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
    mounted: function () {
        
    },
    computed:{
        ...mapGetters([
            'resourceTypes'
        ]),
    },
}
</script>