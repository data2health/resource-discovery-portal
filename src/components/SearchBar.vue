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
            :class="suggestions ? 'rounded-xl rounded-b-sm' : 'rounded-sm md:rounded-xl'"
            class="main-input w-full">
            <!-- small screen action-->
            <button class="block md:hidden bg-accent text-white p-3 w-full text-center mt-3 rounded-2xl" ><i class="fas fa-search"></i> Search</button>
            <!-- options drawer -->
            <div v-if="suggestions" class="bg-gray-200 w-full shadow-xl
            md:absolute md:top-12 hidden md:flex flex-wrap highlight_container">
                <div class="p-4 bg-gray-600 text-white space-y-1 w-full">
                    <h1>Recent Searches</h1>
                    <div class="space-x-2 flex flex-wrap">
                        <template v-for="(item, i) in recentSearches" :key="item + i">
                            <span class="text-xs mb-3">
                                <template v-if="item && item.length > 60">
                                    <Popper :content="item" class="tip" :hover="true" placement="top" arrow>
                                        <router-link :title="item" active-class="text-secondary" class="text-white hover:text-accent-light"
                                        :to="{ path: '/search', query: { 'q': item }}">
                                            <i class="fas fa-search text-xs text-accent"></i> 
                                            {{item.length > 60 ? item.substring(0, 60) + '...' : item}}
                                        </router-link>
                                    </Popper>
                                </template>
                                <router-link v-else :title="item" active-class="text-secondary" class="text-white hover:text-accent-light"
                                :to="{ path: '/search', query: { 'q': item }}">
                                    <i class="fas fa-search text-xs text-accent"></i> 
                                    {{item}}
                                </router-link>
                            </span>
                        </template>
                    </div>
                    <template v-if="recentSearches.length == 0">
                        <span class="text-gray-400">No Recent Searches</span>
                    </template>
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
            doneTypingInterval : 400,
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
                    let top = res.data?.facets?.['@type']?.terms.map(f => f.term);
                    top = top.length > 3 ? top.slice(2) : top;
                    top.forEach(term => {
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
            }, 500);
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