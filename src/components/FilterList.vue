<template>
    <div class="rounded-2xl p-2 mb-3 shadow select-none bg-gray-200/50 hover:bg-gray-300/50" data-aos="fade-in">
        <div @click="open = !open" 
        class="rounded cursor-pointer p-1 text-gray-600 flex justify-start text-xs items-center">
            <span>{{ name }} ({{items.length}})</span>
        </div>
        <div v-if="type == 'checkbox' && open">
            <template v-for="(item) in items" :key="item + name">
                <button @click="activateFilter(item)" 
                class="rounded-2xl block w-full select-none text-left px-3 py-1 m-1 text-xs" 
                :class="!item?.active ? 'text-main border-2 border-main hover:border-tertiary bg-gray-100' : 
            'bg-main border-2 border-main dark:bg-secondary dark:hover:bg-secondary-light text-white hover:bg-main-light'">
                    <i :class="[item?.active ? 'fas fa-circle text-tertiary' : 'far fa-circle']"></i> {{item.name || item.term}}
                </button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterList",
    props: {
        'name': String,
        'items': Array,
        'type': String,
        'section': String
    },
    data: function(){
        return {
            open: false
        }
    },
    methods:{
        activateFilter (type){
            this.$store.commit('activateFilter', {'section': this.section, 'filter': type});
        }
    }
}
</script>