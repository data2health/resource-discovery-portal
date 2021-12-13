<template>
    <div>
        <!-- Type -->
        <div class="bg-main text-white p-1 w-1/2 rounded-t-lg text-sm ml-2">
            <h3><i class="fab fa-github"></i> GitHub Repository</h3>
        </div>
        <!-- Content Preview-->
        <div class="bg-white h-auto tracking-wide mb-14 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-main border-t-2">
            <h5 class="text-lg font-semibold ml-3 p-1">
                {{item._source.label}}
            </h5>
            <p class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white">
                some description
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Result",
    props:{
        item: Object
    }
}
</script>