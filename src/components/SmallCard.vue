<template>
    <!-- card -->
    <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-64">
        <div class="p-4 text-center space-y-3">
        <h1 class="font-bold text-lg text-gray-700 dark:text-gray-400">{{title}}</h1>
        <i class="fa-3x text-secondary-light" :class="icon"></i>
        </div>
        <div class="text-left text-sm p-4">
        <ul class="space-y-2">
            <li v-for="item in items" :key="item + 'card'">
                <i class="fas fa-search text-tertiary"></i> <router-link class="!text-main dark:!text-tertiary-light" :to="{ path: '/search', query: { 'q': item }}">
                    {{item}}
                </router-link>
            </li>
        </ul>
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
    }
}
</script>