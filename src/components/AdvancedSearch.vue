<template>
    <a href="javascript:void(0);" class="font-bold" @click.prevent="as_open = !as_open">Advanced Search</a>
    <!-- cookie consent -->
    <VModal v-model="as_open" @confirm="as_open = false">
        <template v-slot:title>
            <h2 class="text-main">Advanced Search</h2>
        </template>
        <template v-slot:content>
            <div class="p-1 w-full">
                <!-- Filters -->
                <FilterList type="checkbox" name="dataSource" :items="['CD2H','Outbreak.info','Data Discovery Engine','DataMed']"></FilterList>
                <FilterList type="checkbox" name="dataType" :items="['Dataset','Publication','Video','Repository','Person', 'Clinical Trial']"></FilterList>
            </div>
        </template>
    </VModal>
</template>

<script>
import FilterList from '../components/FilterList.vue'

export default {
    name: "AdvancedSearch",
    data: function(){
        return {
            as_open: false
        }
    },
    components:{
        FilterList
    }
}
</script>