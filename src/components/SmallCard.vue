<template>
    <!-- card -->
    <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-32 md:w-64 group bg-white">
        <div class="p-4 text-center space-y-3">
            <h1 class="font-bold text-xs md:text-lg text-gray-700 dark:text-gray-400">
                <router-link :to="'/resource/' + title">{{title}}</router-link>
            </h1>
            <img :src="theme.img" alt="logo" :class="theme.fill" class="rounded w-full md:w-1/3 m-auto md:group-hover:hidden">
        </div>
        <div class="text-left text-sm p-4">
            <ul class="space-y-2 hidden md:group-hover:block">
                <li v-for="item in items" :key="item + 'card'">
                    <i class="fas fa-search" :class="theme.text"></i> <router-link class="!text-main dark:!text-tertiary-light" :to="{ path: '/search', query: { 'q': item }}">
                        {{item}}
                    </router-link>
                </li>
            </ul>
            <p class="text-sm text-center mt-3 md:group-hover:hidden">{{$filters.numberWithCommas(2354385)}} available</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SmallCard',
    props: {
        items: Array,
        title: String
    },
    computed: {
        theme: function() {
            //remove 's' if title is plural
            return this.$store.getters.getTheme(this.title.endsWith('s') ? this.title.slice(0, -1) : this.title);
        },
    }
}
</script>