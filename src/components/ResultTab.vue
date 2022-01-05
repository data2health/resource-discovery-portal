<template>
    <div class="p-1 w-1/2 rounded-t-lg text-sm ml-2 bg-gray-200">
        <h3 class="flex justify-between dark:text-gray-500">
            <span class="capitalize">
                <i :class="cls"></i> {{name}}
            </span>
            <img v-if="index.includes('outbreak')" class="h-5 mr-5" src="../../../assets/img/outbreak.svg" alt="Outbreak.info">
            <img v-else-if="index.includes('csbc')" class="h-5 mr-5" src="../../assets/img/csbc.svg" alt="CSBC">
            <img v-else-if="index.includes('cd2h')" class="h-5 mr-5" src="../../assets/img/cd2h.png" alt="CSBC">
            <img v-else class="h-5 mr-5" src="../../assets/img/rdp_color.svg" alt="Resource Discovery Portal">
        </h3>
    </div>
</template>

<script>
export default {
    name: "ResultTab",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000
        }
    },
    props:['cls', 'name', 'index']
}
</script>