<template>
    <div class="rounded-2xl p-2 mb-3 shadow select-none bg-gray-200/50 dark:bg-gray-700 hover:bg-gray-300/50" data-aos="fade-in">
        <div @click="open = !open" 
        class="rounded cursor-pointer p-1 text-gray-600
        font-light flex justify-start text-xs items-center dark:text-tertiary">
            <span>{{ $filters.readableName(name) }} ({{items.length}})</span>
        </div>
        <div v-if="type == 'checkbox' && open">
            <template v-for="(item) in items" :key="item + name">
                <button class="rounded-2xl block w-full select-none text-left px-3 py-1 bg-white hover:bg-gray-200 m-1 text-xs text-gray-500" data-aos="fade-in">
                    <i :class="[item?.active ? 'fas fa-circle' : 'far fa-circle']"></i> {{item}}
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
        'type': String
    },
    data: function(){
        return {
            open: false
        }
    }
}
</script>