<template>
    <div class="dark:bg-gray-800 dark:text-white bg-gray-100">
        <div class="container mx-auto w-1/2 py-6">
            <!-- Search Bar -->
            <form @submit.prevent="search()" class="w-full flex items-center">
            <input 
            v-model="$route.query.q"
            @input="onInput"
            type="text" 
            placeholder="search" 
            class="w-full m-auto py-2 px-4 text-2x text-main 
            rounded-full border border-transparent focus:outline-none focus:ring-2 
            focus:ring-secondary-light focus:border-transparent dark:bg-gray-300">
            <button type="submit" class="btn-main ml-2">
                <i class="fas fa-search"></i>
            </button>
            </form>
        </div>
        <div class="container mx-auto px-4">
            <!-- Types -->
            <div class="flex justify-around items-stretch">
                <!-- Filters -->
                <div class="flex-initial w-32">filter</div>
                <!-- Results -->
                <div class="flex-initial w-64 flex-grow mx-3">
                    <!-- details -->
                    <div class="mb-3 p-2">
                        <p class="text-sm">{{results.length}} results</p>
                    </div>
                    <!-- hits -->
                    <template v-for="(result) in results" :key="result._source.label">
                        <Result :item="result"></Result>
                    </template>
                </div>
                <!-- Recent History -->
                <div class="flex-initial w-1/6">
                    <div class="p-4 text-left rounded bg-gray-400">
                        <h3 class="font-thin text-coolGray-100">Recent Searches</h3>
                        <ul>
                            <template v-for="(item, i) in recentSearches" :key="item + i">
                                <li class="text-sm">
                                    <router-link 
                                    :to="{ path: '/search', query: { 'q': item }}">
                                       <i class="fas fa-search text-xs"></i> {{item}}
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Result from '../components/Result.vue'

export default {
    name: "Search",
    data: function(){
        return {
        }
    },
    components: {
        Result
    },
    methods:{
        search(){
            console.log('searching')
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        onInput(e) {
            this.$router.replace({
                query: {
                ...this.$route.query,
                q: e.target.value,
                }
            })
        }
    },
    mounted: function(){
        this.search();
    },
    computed:{
      ...mapGetters([
        'results',
        'recentSearches'
      ]),
    },
}
</script>