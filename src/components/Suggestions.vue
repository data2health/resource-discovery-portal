<template>
    <!-- Suggestions -->
    <div v-if="items.length" class="p-2 text-gray-700 space-y-1 w-full break-words flex-grow bg-gray-100">
        <h6 class="flex justify-start text-sm">
            <img :src="theme.img" alt="logo" class="w-4 mr-2">
            {{name}} Suggestions
        </h6>
        <ul>
            <template v-for="(s, i) in items" :key="s + i">
                <li class="mb-1text-white text-xs" v-if="i < 3">
                    <router-link class="!text-gray-800 hover:!text-accent-light" active-class="text-secondary"
                     :to='{ path: "/search", query: { "q": `"` + s._id + `"` + " AND resourceTypeName.keyword:" + name }}'>
                    <i class="fas fa-search " :class="theme.text"></i> 
                        {{s.name ||  s.title  || s.toolName || s.label || 'Click for more info'}}
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