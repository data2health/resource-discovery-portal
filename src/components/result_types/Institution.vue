<template>
    <!--🦄 Type Specific Content 🦄-->
    <div :class="theme.bg">
        <!-- 🦄 Badges 🦄 -->
        <div class="flex justify-start items-center flex-wrap bg-white dark:bg-gray-700">
            <template v-for="pill in pills" class="" :key="pill.value">
                <!-- pill -->
                <Pill :color="theme['bg']">
                    <template v-slot:title>{{$filters.readableName(pill.field)}}</template>
                    <template v-slot:value>{{pill.value}}</template>
                </Pill>
            </template>
        </div>
        <div class="flex justify-around flex-wrap items-center p-2">
            <!-- 🦄 Curation 🦄 -->
            <div  v-if="item?.curatedBy" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2">
                <h3 class="font-light  mb-2" :class="theme['text']">Curated by</h3>
                <template v-if="item?.curatedBy?.url">
                    <img v-if="item?.curatedBy?.name == 'ClinicalTrials.gov'" src="/assets/img/ctgov.jpeg" alt="ClinicalTrials.gov" class="w-32">
                    <img v-else-if="item?.curatedBy?.name == 'Figshare'" src="/assets/img/figshare.png" alt="Figshare" class="w-32">
                    <img v-else-if="item?.curatedBy?.name == 'Protocols.io'" src="/assets/img/protocols_io.png" alt="Protocols.io" class="w-32">
                    <a  :href="item?.curatedBy?.url" target="_blank" rel="nonreferrer">
                            {{item?.curatedBy?.name || 'more info'}} <span class="font-bold">({{$filters.formatDate(item?.curatedBy?.curationDate)}})</span> <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                    </a> 
                    <Pill v-if="item?.curatedBy?.versionDate" :color="theme['bg']">
                        <template v-slot:title>version</template>
                        <template v-slot:value>{{$filters.formatDate(item?.curatedBy?.versionDate)}}</template>
                    </Pill>
                </template>
                <p v-else>{{item?.curatedBy?.name}} ({{$filters.formatDate(item?.curatedBy?.curationDate)}})</p>
            </div>
        </div>
        <div v-if="item?.keywords" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.keywords" :key="tag + i">
                <router-link class=" text-white hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
            </template>
        </div>
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Institution",
    props:{
        item: Object,
        theme: Object
    },
    components:{
        PopUpPreview
    },
    computed:{
        pills: function() {
            let pills = [];
            // field containing values you want to display as pills
            let possibleFields = ['identifier'];

            possibleFields.forEach(f => {
                if (f in this.item) {
                    if (Array.isArray(this.item[f])) {
                        this.item[f].forEach(v => pills.push({'field': f, 'value': v}));
                    }else{
                        pills.push({'field': f, 'value': this.item[f]})
                    }
                }
            });
            return pills;
        }
    },
    mounted: function(){
        console.log('INST MOUNTED')
    }
}
</script>