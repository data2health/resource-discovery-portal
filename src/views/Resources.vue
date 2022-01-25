<template>
    <div class="flex justify-center items-stretch flex-wrap w-full p-4 md:p-20 darkMode">
        <template v-for="(resource, title) in resourceTypes" :key="resource.name">
            <ResourceCard 
                :title="title"
                :items="['test', 'test2']"></ResourceCard>
        </template>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ResourceCard from '../components/ResourceCard.vue'

export default {
    name: 'Resources',
    data: function(){
        return {

        }
    },
    components:{
        ResourceCard
    },
    computed:{
        ...mapGetters([
            'resourceTypes',
        ]),
    },
}
</script>
