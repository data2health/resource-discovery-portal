<template>
    <div class="p-2 rounded-sm relative border-t-gray-300 border-t-2 space-y-3">
        <h1 class="font-light text-2xl" :class="theme['text']">DETAILS</h1>
        <!-- other titles -->
        <div v-if="item?.alternateName" class="p-1">
            <template v-for="name in item?.alternateName" :key="name">
                <h2 class="text-xl dark:text-gray-200">{{name}}</h2>
            </template>
        </div>
        <!-- 🦄 Badges 🦄 -->
        <div class="flex justify-start items-center flex-wrap">
            <template v-for="pill in pills" class="text-sm" :key="pill.value">
                <!-- pill -->
                <Pill :color="theme['bg']">
                    <template v-slot:title>{{$filters.readableName(pill.field)}}</template>
                    <template v-slot:value>{{pill.value}}</template>
                </Pill>
            </template>
        </div>
       <!-- 🦄 Various Details 🦄 -->
        <div v-if="fullView">
            <!-- 🦄 Authors 🦄 -->
            <!-- if by institution -->
            <template v-if="authorsByInstitution">
                <p class="mt-2" :class="theme.text">Authors by institution:</p>
                <p v-for="(authors, institution) in authorsByInstitution" :key="institution" class="mb-2">
                    <PopUpPreview :content="{'authors':authors}" :name="institution + ' (' + authors.length + ')'" :theme="theme"></PopUpPreview>
                </p>
            </template>
            <!-- else list them-->
            <template v-if="authors">
                <p class="mt-2" :class="theme.text">Authors:</p>
                <!-- short list -->
                <template v-for="(author, i) in authors" :key="author">
                    <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                        <i class="fas fa-search"></i> {{author}} <span v-if="i < authors.length-1">, </span>
                    </router-link>
                </template>
            </template>
        </div>
        <!-- 🦄 Curation 🦄 -->
        <div  v-if="item?.curatedBy">
            <h3 class="font-light text-2xl mb-2" :class="theme['text']">CURATED BY</h3>
            <template v-if="item?.curatedBy?.url">
                <img v-if="item?.curatedBy?.name == 'ClinicalTrials.gov'" src="/assets/img/ctgov.jpeg" alt="ClinicalTrials.gov" class="w-64">
                <a  :href="item?.curatedBy?.url" target="_blank" rel="nonreferrer">
                    {{item?.curatedBy?.name}} <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                </a> 
                ({{$filters.formatDate(item?.curatedBy?.curationDate)}})
                <Pill v-if="item?.curatedBy?.versionDate" :color="theme['bg']">
                    <template v-slot:title>version</template>
                    <template v-slot:value>{{$filters.formatDate(item?.curatedBy?.versionDate)}}</template>
                </Pill>
            </template>
            <p v-else>{{item?.curatedBy?.name}} ({{$filters.formatDate(item?.curatedBy?.curationDate)}})</p>
        </div>
        <!-- 🦄 Citations 🦄 -->
        <div v-if="item?.citedBy">
            <ExpandableSection :color="theme['text']" :expanded="false">
                    <template v-slot:title>
                        CITATIONS ({{item?.citedBy.length}})
                    </template>
                    <template v-slot:value>
                        <template v-for="(citation, i) in item?.citedBy" :key="i + 'cit'">
                            <p v-if="citation.url" class="dark:text-white">
                                {{citation?.identifier}}
                                <a :href="citation.url" target="_blank" rel="nonreferrer">source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                            </p>
                            <Description class="text-xs" :text="citation.citation"></Description>
                        </template>
                    </template>
            </ExpandableSection>
        </div>
    </div>
</template>

<script>
import Description from '../ExpandableDescription.vue'
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "ClinicalTrialResult",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
        Description,
        PopUpPreview
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
        overall_officials: function(){
            if (this.item && this.item.overall_official) {
                return this.item.overall_official.map(item => item.overall_official_name);
            }else{
                return false
            }
        },
        pills: function() {
            let pills = [];
            // field containing values you want to display as pills
            let possibleFields = ['overall_status', 'nct_id','study_type', 'phase', 'healthCondition', 'identifier', 'identifierSource'];

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