<template>
    <div class="w-full">
        <div class="flex justify-center items-center">
            <div class="px-2">
                <button @click="previous()"><i class="fas fa-chevron-left fa-2x hover:text-accent"></i></button>
            </div>
            <div class="space-y-2">
                <div class="bg-black/20 rounded-full px-9 py-3">
                    <h3>"<i>{{examples[selected].title}}</i>" <i class="fas fa-comment"></i></h3>
                </div>
                <div 
                class="flex justify-evenly items-center w-full flex-wrap md:flex-nowrap bg-black/50 rounded p-1"
                v-for="example, i in examples[selected].examples" 
                :key="i + 'example'">
                    <div class="w-1/3">
                        <b>{{example.context}}</b>
                    </div>
                    <div>
                        <i class="fas fa-arrow-right fa-2x"></i>
                    </div>
                    <div class="w-1/3">
                        <div v-for="q, j in example.queries" :key="j + 'ex'">
                            <b><router-link class="text-accent" :to="'/resources/' + q.type">{{q.type}}</router-link></b> :
                            <p v-for="item,y in q.items" :key="y + 'q'">
                                <router-link 
                                class="!text-white dark:!text-accent hover:!text-accent-light dark:hover:!text-accent-light text-xs" 
                                :to="{ path: '/search', query: { 'q': item + ' AND resourceTypeName:' + q.type}}">
                                    <small><i class="fas fa-search"></i> "{{item}}"</small>
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-2">
                <button @click="next()"><i class="fas fa-chevron-right fa-2x hover:text-accent"></i></button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Carousel',
    methods:{
        next(){
            if (this.selected + 1 == this.examples.length) {
                this.selected = 0;
            }else{
                this.selected++;
            }
        },
        previous(){
            if (this.selected - 1 < 0) {
                this.selected = this.examples.length - 1;
            }else{
                this.selected--;
            }
        }
    },
    data: function(){
        return {
            selected: 0,
            examples:[
                {
                    'title': 'I want to stay up to date on PCR testing techniques',
                    'examples':[
                        {
                            'context': 'Connect with researches who have relevant expertise',
                            'queries': [
                                {
                                    'type': 'Profile',
                                    'items': ['Chunlei Wu', 'Dave Eichmann']
                                }
                            ]
                        },
                        {
                            'context': 'Browse literature for new publications',
                            'queries': [
                                {
                                    'type': 'Publication',
                                    'items': ['Comparison of Digital PCR and Quantitative PCR with Various SARS-CoV-2 Primer-Probe Sets']
                                }
                            ]
                        },
                        {
                            'context': 'Search for a protocol',
                            'queries': [
                                {
                                    'type': 'Protocol',
                                    'items': ['Detection of Sars-Cov2 Using Droplet Digital PCR']
                                }
                            ]
                        },
                        {
                            'context': 'Find informative Youtube videos',
                            'queries': [
                                {
                                    'type': 'Video',
                                    'items': ['PCR Essentials']
                                }
                            ]
                        },
                    ]
                },
                {
                    'title': 'My lab is considering expanding its research focus to include biochemical systems modeling, which would require utilizing new programming techniques',
                    'examples':[
                        {
                            'context': 'Find up-to-date funding opportunities from NIH',
                            'queries': [
                                {
                                    'type': 'Funding Opportunity',
                                    'items': ['Advancing Genomic Medicine Research (Clinical Trial Optional) (R21)']
                                }
                            ]
                        },
                        {
                            'context': 'Discover researches with specific software expertise',
                            'queries': [
                                {
                                    'type': 'Profile',
                                    'items': ['Thomas Schaffter', 'Andrew Su']
                                }
                            ]
                        },
                        {
                            'context': 'Browse relevant software tools',
                            'queries': [
                                {
                                    'type': 'Tool',
                                    'items': ['Dynamic Causal Modelling of COVID-19']
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    }
}
</script>