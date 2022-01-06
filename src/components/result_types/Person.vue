<template>
    <div class="text-left">
        <!-- Type -->
        <ResultTab :name="result_type" :cls="[theme.icon, theme.text]" :index="item?._index"></ResultTab>
        <!-- Content Preview-->
        <div class="bg-white h-auto p-4 tracking-wide mb-4 mx-1 rounded-sm relative dark:bg-gray-600 border border-t-gray-300 border-t-2">
            <h5 class="text-lg font-semibold">
                <router-link :to="{ name: 'ResultDetails', query: {'resource': item._id} }">{{source?.name}}</router-link>
            </h5>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">ABOUT</h1>
            </div>
            <!-- description -->
            <Description :text="source?.bio"></Description>
            <div class="flex justify-between">
                <!-- published date -->
                <p v-if="source?.created_at" class="text-sm">
                    <i class="fas fa-book" :class="theme.text"></i> {{$filters.formatDate(source?.created_at)}}
                </p>
                <!-- updated date -->
                <p v-if="source?.updated_at" class="text-sm">
                    <i class="fas fa-clock" :class="theme.text"></i> {{$filters.formatDate(source?.updated_at)}}
                </p>
            </div>
            <!-- Full View Headers -->
            <div v-if="fullView" :class="theme['text']" class="text-2xl p-3 border-b-2 border-gray-200 mb-3">
                <h1 class="font-light">DETAILS</h1>
            </div>
            <!-- detail box -->
            <div class="flex justify-around items-center flex-wrap">
                <!-- type -->
                <template v-if="source?.type" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title>Type</template>
                        <template v-slot:value>{{source?.type}}</template>
                    </Pill>
                </template>
                <!-- location -->
                <template v-if="source?.location" class="text-sm">
                    <Pill :color="theme['bg']">
                        <template v-slot:title><i class="fas fa-map-marker-alt"></i></template>
                        <template v-slot:value>{{source?.location}}</template>
                    </Pill>
                </template>
            </div>
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex items-center justify-start">
                <div class="text-center">
                    <img v-if="source?.avatar_url" 
                    :src="source?.avatar_url" 
                    alt="github avatar" 
                    class="rounded-md w-1/3 border-8 border-white hover:border-gray-100 m-auto bg-white shadow-lg">
                    <p class="text-center" v-if="source?.url">
                        <a :href="source?.url" target="_blank" rel="nonreferrer">{{source?.name}} <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                </div>
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <p v-if="source?.login" class="mb-1"><i class="fab fa-github" :class="theme.text"></i> {{source?.login}}</p>
                    <p v-if="source?.twitter_username" class="mb-1"><i class="fab fa-twitter" :class="theme.text"></i> {{source?.twitter_username}}</p>
                    <p v-if="source?.followers"><i class="fas fa-bell" :class="theme.text"></i> {{source?.followers}}</p>
                    <p v-if="source?.company" class="mb-1"><i class="fas fa-building" :class="theme.text"></i> {{source?.company}}</p>
                    <p v-if="source?.visibility" class="mb-1"><i class="fas fa-lock" :class="theme.text"></i> {{source?.visibility}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ResultTab from '../ResultTab.vue'
import Description from '../ExpandableDescription.vue'

export default {
    name: "Person",
    props:{
        item: Object,
        fullView: Boolean
    },
    components:{
        ResultTab,
        Description
    },
    computed:{
        // root level of data, for readability
        source: function () {
            // deeper > shallow
            return this.item?._source?.raw?.attributes ? this.item?._source?.raw?.attributes : 
            this.item?._source?.raw ? this.item?._source?.raw : 
            this.item?._source ? this.item?._source : this.item;
        },
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