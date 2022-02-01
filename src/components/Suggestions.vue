<template>
    <!-- Suggestions -->
    <div v-if="items.length" class="p-4 text-white space-y-1 w-full md:w-1/3 break-words flex-grow" :class="theme.bg">
        <h1 class="flex justify-start">
            <img :src="theme.img" alt="logo" class="w-6 mr-2">
            {{name}}
        </h1>
        <ul>
            <template v-for="(s, i) in items" :key="s + i">
                <li class="text-xs mb-3 text-white">
                    <Popper :content="s.name || s.title || s.toolName" class="tip" :hover="true" placement="top" arrow>
                        <router-link :title="s"
                        :to="{ path: '/search', query: { 'q': s._id }}">
                        <i class="fas fa-search text-xs text-tertiary"></i> 
                            {{s.name && s.name.length > 30? s.name.substring(0, 30) + '...' : s.name || 
                            s.title && s.title.length > 30? s.tile.substring(0, 25) + '...' : s.title || 
                            s.toolName && s.toolName.length > 30? s.toolName.substring(0, 25) + '...' : s.toolName}}
                        </router-link>
                    </Popper>
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