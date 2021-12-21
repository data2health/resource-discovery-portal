<template>
    <div>
        <!-- Type -->
        <div class=" text-gray-600 p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
            <h3><i class="fas fa-circle text-sky-500'"></i> Hit</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold ml-3 p-1">
                <router-link :to="{ name: 'ResultDetails', params: {result_id: item._id } }">{{item._source.label}}</router-link>
            </h5>
            <p class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white">
                default component
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: "DefaultResult",
    props:{
        item: Object
    }
}
</script>