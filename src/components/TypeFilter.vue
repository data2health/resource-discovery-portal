<template>
    <div class="flex justify-start items-center overflow-scroll p-3 w-full flex-wrap">
        <template v-for="type in filters['resourceTypeName.keyword']" :key="type + 'f'">
            <button 
            @click="activateFilter(type)"
            :class="!type?.active ? 'text-main dark:text-accent-light border-2 border-main dark:border-accent hover:border-accent' : 
            'bg-main border-2 border-main dark:bg-secondary dark:hover:bg-secondary-light text-white hover:bg-main-light'"
            class="shadow-sm hover:shadow-md px-4 py-1 text-center 
            m-1 rounded-lg  md: flex justify-center items-center">
                <img :src="type.img" :alt="type" class="h-5 mr-2"> {{type.term}}
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
        activateFilter (type){
            this.$store.dispatch('activateFilter', {'section': 'resourceTypeName.keyword', 'filter': type});
            this.$store.dispatch('activateFilter'
        }
    },
    computed:{
        ...mapGetters([
            'filters'
        ])
    },
}
</script>