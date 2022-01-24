<template>
    <div class="w-full min-h-screen dm">
        <div class="relative w-full">
            <div class="w-full sticky top-0" :class="theme.bg">
                <div class="max-w-screen-xl m-auto flex justify-between items-center flex-wrap p-6">
                    <router-link to="/resources"><i class="fas fa-chevron-left"></i> Back to all resources</router-link>
                    <input type="text" class="rounded-full p-2 w-1/3">
                    <div class="flex justify-around flex-wrap items-center space-x-4">
                        <h1 class="font-bold text-xl">{{resource}}</h1>
                        <img :src="theme.img" :alt="resource" class="h-12">
                        <h1>{{$filters.numberWithCommas(54359)}} Results</h1>
                    </div>
                </div>
            </div>
            <div class="min-h-screen bg-white">
                <div class="flex justify-center items-center">
                    <div class="w-2/3 md:w-1/3">
                        <Chart :data="[]" type="doughnut" :name='resource'></Chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from '../components/Chart.vue'

export default {
    name: 'ResourceSearch',
    props:{
        resource: String
    },
    components:{
        Chart
    },
    computed:{
        theme: function() {
            return this.$store.getters.getTheme(this.resource);
        },
    }
}
</script>
