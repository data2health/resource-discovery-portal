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
            <!-- 🦄 Content 🦄 -->
            <div  v-if="item?.content?.html" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <Description :text="item?.content?.html"></Description>
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
import Description from '../ExpandableDescription.vue'

export default {
    name: "Funding",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
        PopUpPreview,
        Description
    },
    computed:{
        authors: function(){
            if (this.item && this.item?.author) {
                return this.item?.author.map(item => item.name);
            }else{
                return false
            }
        },
        authorsByInstitution: function(){
            let res = {};
            if (this.item && this.item?.author) {
                this.item?.author.forEach(item => {
                    if( Object.hasOwnProperty.call(item, 'affiliation')){
                        item.affiliation.forEach(aff => {
                            if (Object.hasOwnProperty.call(aff, 'name')) {
                                if (!Object.hasOwnProperty.call(res, aff.name)) {
                                    res[aff.name] = [item.name];
                                }else{
                                    res[aff.name].push(item.name);
                                }
                            }
                        });
                    }
                });
            return Object.keys(res).length ? res : false;
            }else{
                return false
            }
        },
        pills: function() {
            let pills = [];
            // field containing values you want to display as pills
            let possibleFields = ['primary_ic', 'doc_num'];

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
    }
}
</script>