<template>
    <div class="rounded-md p-2 mb-3 shadow select-none bg-gray-200/50 dark:bg-gray-200 hover:bg-gray-300/50">
        <div @click="open = !open" 
        class="rounded cursor-pointer p-1 text-gray-600 flex justify-start text-sm items-center font-bold">
            <span>{{ name }} <span class="text-accent-dark">({{items.length}})</span> <b class="text-main" v-if="currentlyActive">({{currentlyActive}} active)</b></span>
        </div>
        <div v-if="open">
            <div class="bg-gray-400 p-2 rounded-md mb-1">
                <small>Search Term</small>
                <form @submit.prevent="search()" class="w-full flex items-center m-auto">
                    <input v-model="q"
                        type="text" 
                        placeholder="search" 
                        class="main-input w-full rounded-md !p-1">
                </form>
            </div>
            <template v-for="(item, i) in results" :key="item.term">
                <button v-if="i + 1 < limit" @click="activateFilter(item)" 
                class="rounded-2xl block w-full select-none text-left px-3 py-1 m-1 text-xs break-words" 
                :class="!item?.active ? 'text-main border-2 border-main hover:border-accent bg-gray-100' : 
            'bg-main border-2 border-main dark:bg-secondary dark:hover:bg-secondary-light text-white hover:bg-main-light'">
                    <i :class="[item?.active ? 'fas fa-circle text-accent' : 'far fa-circle']"></i> {{item.name || item.term}}
                </button>
            </template>
            <button 
            class="rounded block w-full select-none text-left px-3 py-1 m-1 text-xs break-words bg-accent hover:bg-accent-light text-white" 
            @click="showAll = !showAll">{{showAll ? 'show less' : 'show more'}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterList",
    props: {
        'name': String,
        'items': {
            type: Array,
            default: []
        },
        'section': String,
        'showAll': false,
    },
    data: function(){
        return {
            open: false,
            q: ''
        }
    },
    methods:{
        activateFilter (type){
            this.$store.dispatch('activateFilter', {'section': this.section, 'filter': type});
            this.$store.dispatch('search');
        }
    },
    computed:{
        currentlyActive: function () {
            return this.items.filter((value) => value.active).length
        },
        results: function(){
            if (this.q) {
                return this.items.filter(item => item.term.toLocaleLowerCase().includes(this.q.toLocaleLowerCase()));
            }else{
                return this.items
            }
        },
        limit: function(){
            return this.showAll ? 50 : 10;
        }
    }
}
</script>