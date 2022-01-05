<template>
    <div class="p-1 rounded-t-lg text-sm ml-2 bg-gray-200" :class="fullView ? 'w-3/4 dark:bg-gray-800' : 'w-1/2 dark:bg-gray-700'">
        <h3 class="flex justify-between dark:text-gray-400 text-gray-400">
            <span class="capitalize" :class="fullView ? 'text-2xl font-light' : ''">
                <i :class="[cls]"></i> {{name}}
            </span>
            <img v-if="index.includes('outbreak')" :class="fullView ? 'h-10' : 'h-5'" class="mr-5" src="../../../assets/img/outbreak.svg" alt="Outbreak.info">
            <img v-else-if="index.includes('csbc')" :class="fullView ? 'h-10' : 'h-5'" class="mr-5" src="../../assets/img/csbc.svg" alt="CSBC">
            <img v-else-if="index.includes('cd2h')" :class="fullView ? 'h-10' : 'h-5'" class="mr-5" src="../../assets/img/cd2h.png" alt="CSBC">
            <img v-else class="mr-5" :class="fullView ? 'h-10' : 'h-5'" src="../../assets/img/rdp_color.svg" alt="Resource Discovery Portal">
        </h3>
    </div>
</template>

<script>
export default {
    name: "ResultTab",
    props:['cls', 'name', 'index'],
    computed:{
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        }
    }
}
</script>