<template>
    <div class="flex justify-between w-full">
        <!-- Preferences -->
        <Preferences></Preferences>
    </div>
    <div class="flex justify-between items-center flex-wrap">
        <!-- total hits -->
        <div class="flex justify-between items-center">
            <small class="text-gray-500">{{$filters.numberWithCommas(total)}} Results</small>
        </div>
        <!-- pages -->
        <div class="text-md">
            <template v-if="items && items.length > perPage">
                <div class="flex flex-wrap justify-center p-1 mt-2 text-white">
                    <div class="cursor-pointer p-1 flex items-center justify-center h-6 bg-accent hover:bg-accent-light dark:bg-secondary-light dark:hover:bg-secondary rounded mx-2" 
                    v-show="groupPages && !startCapLimitReached" @click.prevent="previousGroup()">
                        <i class="fas fa-angle-double-left"></i>
                    </div>
                    <div class="p-1 rounded h-6 w-6 flex items-center justify-center mx-2" 
                    :class="[!page <= 1 ? 'cursor-pointer bg-accent hover:bg-accent-light dark:bg-secondary-light dark:hover:bg-secondary' : 'cursor-not-allowed bg-gray-400']" @click.prevent="prevPage()">
                        <i class="fas fa-angle-left"></i>
                    </div>
                    <template v-for="n in pages">
                        <div v-if="n >= startCap && n <= endCap" 
                        :key="n + 'page'"
                        class="rounded cursor-pointer p-1 flex items-center justify-center h-6 w-6 mr-1" 
                        @click.prevent="handlePageChange(n)"
                        :class="[page == n ? 'bg-main dark:bg-accent-light text-white' : 'text-secondary-light']">
                            {{n}}
                        </div>
                    </template>
                    <div class="p-1 rounded h-6 w-6 flex items-center justify-center mx-2" 
                    :class="[page >= pages ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-accent hover:bg-accent-light dark:bg-secondary-light dark:hover:bg-secondary']" @click.prevent="nextPage()">
                        <i class="fas fa-angle-right"></i>
                    </div>
                    <div class="p-1 flex items-center justify-center h-6 bg-accent hover:bg-accent-light dark:bg-secondary-light dark:hover:bg-secondary rounded mx-2 cursor-pointer" 
                    v-show="groupPages && !endCapLimitReached" @click.prevent="nextGroup()">
                        <i class="fas fa-angle-double-right"></i>
                    </div>
                </div>
            </template>
        </div>
        <!-- per page -->
        <div class="flex justify-between items-center text-sm">
            <label class="mr-2  text-gray-500" for="perPage">Per Page</label>
            <select name="perPage" 
            class="outline-none rounded dark:bg-gray-800 focus:outline-none text-accent" 
            @change="handlePerPage($event)"
            :v-model="perPage">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    </div>
    
</template>

<script>
import Preferences from './Preferences.vue'
import { mapGetters } from 'vuex'

export default {
    name: "Pagination",
    props:['items'],
    data: function(){
        return {
            currentPage: '1',
            perPage: '',
            startCap:0,
            endCap:20,
            startCapLimitReached: true,
            endCapLimitReached: false,
        }
    },
    methods:{
        search(){
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        handlePerPage(e){
            this.$store.commit('changePerPage', {value: e.target.value});
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        handlePageChange(v){
            this.$store.commit('changePage', v);
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        previousGroup: function(){
            var self = this;
            if (!self.startCapLimitReached) {
                if (self.startCap-20 > 0) {
                    this.$store.commit('changePage', self.startCap - 20);
                    self.startCap = self.startCap-20
                    self.endCap = self.endCap-20
                    self.endCapLimitReached = false;
                }else {
                    this.$store.commit('changePage', 1);
                    self.startCap = 0
                    self.endCap = 20
                    self.startCapLimitReached = true;
                    self.endCapLimitReached = false;
                }
            }
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        nextGroup: function(){
            var self = this;
            if (!self.endCapLimitReached) {
                if (self.endCap+20 < self.pages) {
                    this.$store.commit('changePage', self.startCap + 20);
                    self.startCap = self.startCap+20
                    self.endCap = self.endCap+20
                    self.startCapLimitReached = false;
                }else {
                    this.$store.commit('changePage', self.startCap + 20);
                    self.startCap = self.startCap+20
                    self.endCap = self.pages
                    self.endCapLimitReached = true;
                    self.startCapLimitReached = false;
                }
            }
            this.$store.dispatch('search', {value: this.$route.query.q});
        },
        prevPage: function () {
            if (this.page > 1){
                this.$store.commit('downPage');
                this.$store.dispatch('search', {value: this.$route.query.q});
            }
                
        },
        nextPage: function () {
            if (this.page < this.pages){
                this.$store.commit('upPage');
                this.$store.dispatch('search', {value: this.$route.query.q});
            }
        },
    },
    components:{
        Preferences,
    },
    computed:{
        ...mapGetters([
            'pages',
            'page',
            'groupPages',
            'total'
        ]),
    }
}
</script>