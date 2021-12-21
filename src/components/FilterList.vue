<template>
    <div class="rounded-lg p-2 mb-3 shadow bg-gray-100 dark:bg-gray-700" data-aos="fade-in">
        <div class="rounded p-1 text-gray-600 font-extralight flex justify-start text-xs items-center dark:text-tertiary mb-1">
            <button @click="open = !open" type="button" class="icon-btn mr-2 bg-white">
                <i class="fas text-gray-500" :class="[open ? 'fa-chevron-down' : 'fa-chevron-right']"></i>
            </button> <span>{{ $filters.readableName(name) }} ({{items.length}})</span>
        </div>
        <div v-if="type == 'checkbox' && open">
            <template v-for="(item) in items" :key="item + name">
                <div class="font-light flex justify-between items-center mb-1" data-aos="fade-in">
                    <label class="text-xs dark:text-gray-300" :for="item + name">{{item}}</label>
                    <input 
                    :name="item + name" 
                    type="checkbox" class="accent-green-500 rounded">
                </div>
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