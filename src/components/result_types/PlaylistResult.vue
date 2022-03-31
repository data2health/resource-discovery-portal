<template>
    <div class="text-left">
        <!-- Type -->
        <ResultTab :name="result_type" :theme="theme" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class=" font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{item._source.label}}</router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class=" p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <Description :text="item?._source?.description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class=" p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <div class=" font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-between">
                    <div class="text-center">
                        <template v-if="item && item._source.url">
                            <a :href="item._source.url" target="_blank" rel="nonreferrer" class="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-500">
                                <i class="fab fa-youtube-square" :class="theme.text"></i> View Video Playlist <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                            </a>
                        </template>
                    </div>
                    <div class="ml-2 p-3 rounded border border-gray-200 ">
                        <p class="mb-1"><i class="fas fa-info-circle" :class="theme.text"></i> {{item && item?._source?.channel?.channel_title}}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Description from '../ExpandableDescription.vue'
import ResultTab from '../ResultTab.vue'

export default {
    name: "PlaylistResult",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        Description,
        ResultTab
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['resourceTypeName'] ? this.item?._source?.['resourceTypeName'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
    }
}
</script>