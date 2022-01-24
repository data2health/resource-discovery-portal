<template>
    <div class="flex justify-center items-stretch flex-wrap w-full p-4 md:p-20">
        <template v-for="(resource, title) in resourceTypes" :key="resource.name">
            <SmallCard 
                :title="title"
                :items="['test', 'test2']"></SmallCard>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SmallCard from '../components/SmallCard.vue'

export default {
    name: 'Resources',
    data: function(){
        return {

        }
    },
    components:{
        SmallCard
    },
    computed:{
        ...mapGetters([
            'resourceTypes',
        ]),
    },
}
</script>
