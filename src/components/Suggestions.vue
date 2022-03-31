<template>
    <!-- Suggestions -->
    <div v-if="items.length" class="p-4 text-gray-700 space-y-1 w-full break-words flex-grow bg-gray-100">
        <h3 class="flex justify-start ">
            <img :src="theme.img" alt="logo" class="w-4 mr-2">
            {{name}} Suggestions
        </h3>
        <ul>
            <template v-for="(s, i) in items" :key="s + i">
                <li class=" mb-1 text-white" v-if="i < 3">
                    <router-link class="!text-gray-800 hover:!text-accent-light" active-class="text-secondary"
                     :to="{ path: '/search', query: { 'q': s._id + ' AND resourceTypeName.keyword:' + name }}">
                    <i class="fas fa-search " :class="theme.text"></i> 
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