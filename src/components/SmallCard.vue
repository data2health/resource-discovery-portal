<template>
    <!-- card -->
    <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-64 group bg-white">
        <div class="p-4 text-center space-y-3">
        <h1 class="font-bold text-lg text-gray-700 dark:text-gray-400">{{title}}</h1>
        <!-- <i class="fa-3x" :class="[icon, theme.text]"></i> -->
        <img :src="theme.img" alt="logo" :class="theme.fill" class="rounded w-1/3 m-auto group-hover:hidden">
        </div>
        <div class="text-left text-sm p-4">
        <ul class="space-y-2 hidden group-hover:block">
            <li v-for="item in items" :key="item + 'card'">
                <i class="fas fa-search text-tertiary"></i> <router-link class="!text-main dark:!text-tertiary-light" :to="{ path: '/search', query: { 'q': item }}">
                    {{item}}
                </router-link>
            </li>
        </ul>
        <p class="text-sm text-left mt-3 text-secondary-light group-hover:hidden">{{numberWithCommas(2354385)}} available</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SmallCard',
    props: {
        icon: String,
        items: Array,
        title: String
    },
    methods:{
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    computed: {
        theme: function() {
            //remove 's' if title is plural
            return this.$store.getters.getTheme(this.title.endsWith('s') ? this.title.slice(0, -1) : this.title);
        },
    }
}
</script>