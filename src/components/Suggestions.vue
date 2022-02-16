<template>
    <!-- Suggestions -->
    <div v-if="items.length" class="p-4 text-white space-y-1 w-full break-words flex-grow" :class="theme.bg">
        <h3 class="flex justify-start text-md">
            <img :src="theme.img" alt="logo" class="w-4 mr-2">
            {{name}} Suggestions
        </h3>
        <ul>
            <template v-for="(s, i) in items" :key="s + i">
                <li class="text-xs mb-1 text-white" v-if="i < 3">
                    <router-link class="!text-white hover:!text-tertiary-light" active-class="text-secondary"
                     :to="{ path: '/search', query: { 'q': s._id + ' AND @type:' + name }}">
                    <i class="fas fa-search text-xs text-tertiary"></i> 
                        {{s.name ||  s.title  || s.toolName}}
                    </router-link>
                </li>
            </template>
            <template v-if="items.length == 0">
                <li class="text-gray-400">No Suggestions</li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Suggestions",
    props:{
        name: String,
        items: Array
    },
    computed:{
        theme: function() {
            return this.$store.getters.getTheme(this.name);
        },
    }

}
</script>