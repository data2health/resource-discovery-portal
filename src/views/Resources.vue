<template>
    <div class="flex justify-center items-center flex-wrap p-4 md:p-20 darkMode min-h-screen">
        <template v-for="resource in filters['@type']" :key="resource.term">
            <ResourceCard :title="resource.term" :sourceInfo="resource"></ResourceCard>
        </template>
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
            'filters',
        ]),
    },
}
</script>
