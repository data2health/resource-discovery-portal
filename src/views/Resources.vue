<template>
    <div class="flex justify-center items-center darkMode">
        <div class="max-w-4xl min-h-screen my-6">
            <div v-for="(items, group) in grouped" :key="group" 
            class="border-0 border-b border-gray-300 dark:border-gray-700 rounded mb-5  flex justify-start 
            items-stretch flex-wrap p-2 hover:bg-gray-300/10 dark:hover:bg-gray-600/10 transition-all duration-300">
                <h2 class="font-thin text-sm w-full">{{group}}</h2>
                <template v-for="resource in items" :key="resource.term">
                    <ResourceCard :title="resource.term" :sourceInfo="resource"></ResourceCard>
                </template>
            </div>
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
            'groups':{
                'Multimedia':['Video', 'Video Playlist', 'Video Channel', 'Multimedia Object'],
                'People & Institutions':['Profile', 'Institution'],
                'Funding':['Funding Opportunity', 'Grant'],
                'Education': ['Education Resource'],
                'Research': ['Dataset', 'Clinical Trial', 'Protocol', 'Repository', 'Tool', 'Publication', 'Service', 'Research Instrument'],
                "Creative Works": ['Other Creative Work']
            }
        }
    },
    components:{
        ResourceCard
    },
    computed:{
        ...mapGetters([
            'filters',
        ]),
        grouped: function(){
            let groups = {}
            function addToGroups(name, value) {
                if (Object.hasOwnProperty.call(groups, name)) {
                    groups[name].push(value)
                }else{
                    groups[name] = [value]
                }
            }
            this.filters['resourceTypeName.keyword'].forEach(resource => {
                //Video
                let found = false;
                for (const option in this.groups) {
                    let group_members = this.groups[option];
                    if (group_members.includes(resource.term)) {
                        addToGroups(option, resource);
                        found = true;
                    }
                }
                if (!found) {
                    addToGroups('More', resource);
                }
            });
            return groups;
        }
    },
}
</script>
