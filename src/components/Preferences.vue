<template>
    <button @click="toggleExpandedView()" 
    class="rounded-2xl block w-32 select-none text-left px-3 py-1 m-1 text-xs" 
    :class="[expandedView ? 'bg-main hover:bg-main-light text-white' : 'bg-white hover:bg-gray-200 text-gray-500']">
        <i :class="[expandedView ? 'fas fa-check-circle' : 'far fa-circle']"></i> Expand Results
    </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Preferences',
    data: function(){
        return {
            open: false
        }
    },
    methods:{
        toggleExpandedView() {
            this.$store.commit('toggleExpandedView');
        }
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
    }
}
</script>