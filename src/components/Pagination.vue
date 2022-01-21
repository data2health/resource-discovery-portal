<template>
    <div class="flex justify-between w-full">
        <!-- Preferences -->
        <AdvancedSearch></AdvancedSearch>
        <Preferences></Preferences>
    </div>
    <div class="flex justify-between items-center flex-wrap">
        <!-- total hits -->
        <div>
            <p class="font-bold text-lg">{{$filters.numberWithCommas(items.length)}} Results</p>
        </div>
        <!-- pages -->
        <div>
            <div class="p-2 flex justify-center">
                <div v-if="items && items.length" class="flex items-center space-x-1">
                    <a href="#" class="icon-btn bg-gray-200 hover:bg-tertiary">
                        <i class="fas fa-chevron-left"></i>
                    </a>
                    <template v-for="(page, i) in pages" :key="page">
                        <a href="#" 
                        data-aos="zoom-in"
                        :data-aos-delay="(i+1) * 50"
                        class="icon-btn hover:bg-tertiary dark:bg-main-dark"
                        :class="page == currentPage ? 'bg-tertiary-light text-main dark:bg-secondary-light' : 'bg-gray-200' "
                        >
                            {{page}}
                        </a>
                    </template>
                    <a href="#" class="icon-btn bg-gray-200 hover:bg-tertiary">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </div>
                <div v-else class="text-center">
                    <span class="text-tertiary">...</span>
                </div>
            </div>
        </div>
        <!-- per page -->
        <div>
            <label class="font-extralight mr-2 text-xs" for="perPage">Per Page</label>
            <select name="perPage" class="appearance-none accent-pink-500 px-2 py-1 rounded-full dark:bg-gray-400">
                <option value="10">10</option>
                <option value="25">20</option>
                <option value="50">50</option>
            </select>
        </div>
    </div>
    
</template>

<script>
import Preferences from './Preferences.vue'
import AdvancedSearch from '../components/AdvancedSearch.vue'

export default {
    name: "Pagination",
    props:['items'],
    data: function(){
        return {
            currentPage: '1',
            pages: ['1','2','3','4','5','6','7']
        }
    },
    components:{
        Preferences,
        AdvancedSearch
    }
}
</script>