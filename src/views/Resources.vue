<template>
    <div class="darkMode">
        <h2 class="w-72 m-auto">RDP Resources</h2>
        <div class="flex justify-center items-center">
            <div class="max-w-4xl min-h-screen my-6">
                <div v-for="(items, group) in grouped" :key="group" 
                class="border-0 border-b border-gray-300 dark:border-gray-700 rounded mb-5 flex justify-start 
                items-stretch flex-wrap p-2 hover:bg-gray-300/10 dark:hover:bg-gray-600/10 transition-all duration-300">
                    <h4 class="w-full dark:text-white">{{group}}</h4>
                    <div class="w-full">
                        <form @submit.prevent="searchCategory(items)">
                            <ExpandableSection color="text-accent" :expanded="false">
                                    <template v-slot:title>
                                        <span class="text-sm mb-2 font-thin">
                                            <i class="fas fa-search"></i> Search within this category 
                                        </span>
                                    </template>
                                    <template v-slot:value>
                                        <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 bg-gray-100 dark:bg-gray-200" 
                                        :id="group" 
                                        v-model="q"
                                        type="text">
                                    </template>
                            </ExpandableSection>
                        </form>
                    </div>
                    <template v-for="resource in items" :key="resource.term">
                        <ResourceCard :title="resource.term" :sourceInfo="resource"></ResourceCard>
                    </template>
                </div>
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
                'Multimedia':['Video', 'Playlist', 'Video Channel', 'Multimedia Object'],
                'People & Institutions':['Profile', 'Institution'],
                'Funding':['Funding Opportunity', 'Grant'],
                'Education': ['Education Resource'],
                'Research': ['Dataset', 'Clinical Trial', 'Protocol', 'Repository', 'Tool', 'Publication', 'Service', 'Research Instrument'],
                "Creative Works": ['Other Creative Work']
            },
            'q': ''
        }
    },
    components:{
        ResourceCard
    },
    methods:{
        searchCategory(resourceTypes){
            resourceTypes.forEach((type) => {
                this.$store.dispatch('activateFilter', {'section': 'resourceTypeName.keyword', 'filter': type});
            });
            this.$store.commit('saveQuery', {value: this.q});
            this.$router.push({name: 'Search', query:{q: this.q}});
        }
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
    mounted: function(){
        if (!this.filters?.['resourceTypeName.keyword']?.length) {
            this.$store.dispatch('aggregateAndAddFilter', {value: 'resourceTypeName.keyword'});
        }
    }
}
</script>
