<template>
    <div class="flex justify-start items-center overflow-scroll p-3 w-full flex-wrap">
        <template v-for="(info, type) in resourceTypes" :key="type + 'f'">
            <button 
            @click="activateTypeFilter(type)"
            :class="!info?.active ? 'text-main border-2 border-main hover:border-tertiary' : 
            'bg-main border-2 border-main dark:bg-secondary dark:hover:bg-secondary-light text-white hover:bg-main-light'"
            class="shadow-sm hover:shadow-md px-4 py-1 text-center 
            m-1 rounded-lg text-xs md:text-sm flex justify-center items-center">
                <img :src="info.img" :alt="type" class="h-5 mr-2"> {{type}}
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