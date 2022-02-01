<template>
    <form @submit.prevent="search()" class="w-full relative z-50">
            <!-- search -->
            <input 
            v-model="query"
            @keydown="keyDown()"
            @keyup="keyUp()"
            @blur="hideSuggestions()"
            type="text" 
            placeholder="search" 
            :class="suggestions ? 'rounded-full rounded-b-sm' : 'rounded-full'"
            class="main-input w-full">
            <!-- small screen action-->
            <button class="block md:hidden bg-tertiary text-white p-3 w-full text-center" >Search</button>
            <!-- options drawer -->
            <div v-if="suggestions" class="bg-gray-200 w-full max-h-64 overflow-scroll 
            md:absolute md:top-12 hidden md:flex flex-wrap highlight_container">
                <div class="p-4 bg-main-dark text-white space-y-1 w-full md:w-1/3 ">
                    <h1>Recent Searches</h1>
                    <ul>
                        <template v-for="(item, i) in recentSearches" :key="item + i">
                            <li class="text-xs mb-3">
                                <Popper :content="item" class="tip" :hover="true" placement="top" arrow>
                                    <router-link :title="item" active-class="text-secondary"
                                    :to="{ path: '/search', query: { 'q': item }}">
                                        <i class="fas fa-search text-xs text-tertiary"></i> 
                                        {{item ? item.substring(0, 25) + '...' : item}}
                                    </router-link>
                                </Popper>
                            </li>
                        </template>
                        <template v-if="recentSearches.length == 0">
                            <li class="text-gray-400">No Recent Searches</li>
                        </template>
                    </ul>
                </div>
                <!-- Suggestions -->
                <template v-for="(items, type) in suggestions" :key="type">
                    <Suggestions :name="type" :items="items"></Suggestions>
                </template>
            </div>
        </form>
</template>

<script>
import axios from 'axios';

import { mapGetters } from 'vuex'

import Suggestions from './Suggestions.vue'

export default {
    name: "SearchBar",
    data: function(){
        return {
            query: "",
            doneTypingInterval : 1000,
            typingTimer: null,
            suggestions: null,
        }
    },
    components:{
        Suggestions
    },
    methods:{
        keyUp(){
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(this.getSuggestions, this.doneTypingInterval);
        },
        keyDown(){
            clearTimeout(this.typingTimer);
        },
        search(){
            this.$router.push({'path': '/search', query: {'q' : this.query}})
        },
        getSuggestions(){
            let self = this;
            if (this.query.length > 2) {
                this.suggestions = {};
                axios.get(this.baseURL + "?q=" + this.query + "&size=0&aggs=@type").then(res => {
                    let top5 = res.data?.facets?.['@type']?.terms.map(f => f.term);
                    top5 = top5.length > 5 ? top5.slice(4) : top5;
                    top5.forEach(term => {
                            axios.get(this.baseURL + "?q=" + this.query + " AND @type:" + term + "&size=5&fields=name,title,toolName,article_title").then(res => {
                                self.suggestions[term] = res.data.hits;
                            }).catch(err =>{
                                console.log('Error loading suggestions', err);
                            });
                        });
                }).catch(err =>{
                    console.log('Error loading suggestions', err);
                });
            }
            console.log(this.suggestions)
        },
        hideSuggestions(){
            setTimeout(()=>{
                this.suggestions = null
            }, 1000);
        }
    },
    computed:{
        ...mapGetters([
            'recentSearches',
            'baseURL'
        ])
    },
    watch:{
        query: function (v) {
            if (!v) {
                this.suggestions = null;
            }
        }
    }
}
</script>