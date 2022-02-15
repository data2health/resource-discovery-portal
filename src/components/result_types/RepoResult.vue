<template>
    <div class="text-left">
        <!-- Type -->
        <ResultTab :name="result_type" :theme="theme" ></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{item._source.label}}</router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <Description :text="item?._source?.raw?.owner?.description"></Description>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <template v-if="expandedView || fullView" data-aos="fade-in">
                <div class="text-md font-regular p-6 text-gray-500 dark:text-white flex 
                items-center justify-between rounded-xl shadow-xl my-4 w-3/4 m-auto bg-gray-100/50 dark:bg-gray-500">
                    <div class="text-center">
                        <img v-if="item?._source?.raw?.owner?.avatar_url" 
                        :src="item._source.raw.owner.avatar_url" 
                        alt="github avatar" 
                        class="rounded-md w-1/4 shadow-lg border-8 border-white hover:border-gray-100 m-auto bg-white">
                        <p class="text-center">
                            <a :href="item?._source?.raw?.html_url" target="_blank" rel="nonreferrer">
                                {{item?._source?.raw?.name}} <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                            </a>
                        </p>
                    </div>
                    <div class="ml-2 p-3 rounded border border-blue-200 text-xs">
                        <p v-if="item?._source?.raw?.owner?.type" class="mb-1"><i class="fab fa-github" :class="theme.text"></i> {{item?._source?.raw?.owner?.type}}</p>
                        <p v-if="item?._source?.raw?.visibility" class="mb-1"><i class="fas fa-lock" :class="theme.text"></i> {{item?._source?.raw?.visibility}}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ResultTab from '../ResultTab.vue'
import Description from '../ExpandableDescription.vue'

export default {
    name: "RepoResult",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        ResultTab,
        Description
    },
    computed:{
        ...mapGetters([
            'expandedView'
        ]),
        result_type: function () {
            // deeper > shallow
            return this.item?._source?.entity ? this.item?._source?.entity : 
            this.item?._source?.['@type'] ? this.item?._source?.['@type'] : 'Tool';
        },
        theme: function() {
            return this.$store.getters.getTheme(this.result_type.charAt(0).toUpperCase() + this.result_type.slice(1));
        },
    }
}
</script>