<template>
    <div class="flex justify-center items-center darkMode">
        <div class="flex justify-center items-center flex-wrap p-4 min-h-screen max-w-4xl">
            <template v-for="(resource) in filters['resourceTypeName']" :key="resource.term">
                <ResourceCard :title="resource.term" :sourceInfo="resource"></ResourceCard>
            </template>
        </div>
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
