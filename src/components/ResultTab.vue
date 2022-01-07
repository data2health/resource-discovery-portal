<template>
    <div class="p-1 rounded-t-xl text-sm ml-2 bg-gray-200" :class="fullView ? 'w-3/4 dark:bg-gray-800' : 'w-1/3 dark:bg-gray-700'">
        <h3 class="flex justify-between dark:text-gray-400 text-gray-400 ml-3">
            <span class="capitalize" :class="fullView ? 'text-2xl font-light' : ''">
                <i :class="[cls]"></i> {{name}}
            </span>
        </h3>
    </div>
</template>

<script>
export default {
    name: "ResultTab",
    props:['cls', 'name'],
    computed:{
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        }
    }
}
</script>