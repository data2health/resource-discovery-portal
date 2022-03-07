<template>
    <div :class="theme.bg">
        <!-- 🦄 Badges 🦄 -->
        <div class="flex justify-start items-center flex-wrap bg-white dark:bg-gray-700">
            <template v-for="pill in pills" class="text-sm" :key="pill.value">
                <!-- pill -->
                <Pill :color="theme['bg']">
                    <template v-slot:title>{{$filters.readableName(pill.field)}}</template>
                    <template v-slot:value>{{pill.value}}</template>
                </Pill>
            </template>
                <Pill :color="theme['bg']">
                    <template v-slot:title>Has Results</template>
                    <template v-slot:value>
                        <i v-if="item?.hasResults == true" class="fas fa-check-circle text-green-300"></i>
                        <i v-else-if="item?.hasResults == false" class="fas fa-times text-red-400"></i>
                        <span v-else>Not Provided</span>
                    </template>
                </Pill>
        </div>
        <div v-if="item?.abstract" class="bg-gray-100 dark:bg-gray-700 p-2">
            <h3 class="font-bold" :class="theme.text">Abstract:</h3>
            <blockquote v-html="item?.abstract"></blockquote>
        </div>
        <div class="flex justify-around flex-wrap items-center p-2">
            <!-- 🦄 Funding 🦄 -->
            <div  v-if="item?.eligibilityCriteria" class="bg-gray-200 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <h3 class="font-light text-2xl mb-2" :class="theme['text']">Eligibility</h3>
                <p class="text-xs" v-if="item?.eligibilityCriteria?.criteriaText" v-html="item?.eligibilityCriteria?.criteriaText"></p>
                <table class="table-auto w-full text-center">
                    <colgroup>
                        <col width='33%'>
                        <col width='33%'>
                        <col width='33%'>
                    </colgroup>
                    <thead class="border border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0">
                        <tr>
                            <th>Gender</th>
                            <th>Minimum Age</th>
                            <th>Healthy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="flex justify-center items-center space-x-3">
                                <Pill color="bg-blue-500">
                                    <template v-slot:title><i class="fas fa-mars"></i></template>
                                    <template v-slot:value>
                                        <i v-if="item?.eligibilityCriteria?.gender == 'all' || item?.eligibilityCriteria?.gender == 'male'" class="fas fa-check text-green-300"></i>
                                    </template>
                                </Pill>
                                <Pill color="bg-pink-500">
                                    <template v-slot:title><i class="fas fa-venus"></i></template>
                                    <template v-slot:value>
                                        <i v-if="item?.eligibilityCriteria?.gender == 'all' || item?.eligibilityCriteria?.gender == 'female'" class="fas fa-check text-green-300"></i>
                                    </template>
                                </Pill>
                            </td>
                            <td>
                                {{item?.eligibilityCriteria?.minimumAge || 'Not Available'}}
                                <span v-if="item?.eligibilityCriteria?.stdAge" class="text-gray-500">
                                    ({{item?.eligibilityCriteria?.stdAge.toString()}})
                                </span>
                            </td>
                            <td>
                                <i v-if="item?.eligibilityCriteria?.healthyVolunteers == true" class="fas fa-check-circle text-green-300"></i>
                                <i v-else-if="item?.eligibilityCriteria?.healthyVolunteers == false" class="fas fa-times text-red-400"></i>
                                <span v-else>Not Provided</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="w-full text-left text-xs" v-if="item?.eligibilityCriteria?.inclusionCriteria">
                    <colgroup>
                        <col width='50%'>
                        <col width='50%'>
                    </colgroup>
                    <thead class="border border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0">
                        <th>Individuals Included</th>
                        <th>Individuals Excluded</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul class="list-disc list-inside space-y-2">
                                    <li v-for="criteria in item?.eligibilityCriteria?.inclusionCriteria" :key="criteria">
                                        {{criteria}}
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul class="list-disc list-inside space-y-2">
                                    <li v-for="criteria in item?.eligibilityCriteria?.exclusionCriteria" :key="criteria">
                                        {{criteria}}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 🦄 Arm Group 🦄 -->
            <div  v-if="item?.armGroup" class="bg-gray-200 dark:bg-gray-700 rounded-xl p-2 shadow-md  space-y-1 m-2 w-full">
                <h3 class="font-light text-2xl mb-2" :class="theme['text']">Intervention</h3>
                <ul>
                    <li v-for="(group, i) in item?.armGroup" :key="i + 'ag'" class="mb-2">
                        <details>
                            <summary><h1 class="font-bold" :class="theme.text">{{group?.name}}</h1></summary>
                            <p>{{group?.description}}</p>
                            <div class="space-y-1">
                                <div v-for="(inter, it) in group?.intervention" :key="it + 'inter'" class="bg-white dark:bg-gray-800 rounded-lg p-2 text-sm">
                                    <h4 class="font-bold">{{inter?.name}}</h4>
                                    <p>{{inter?.description}}</p>
                                    <Pill :color="theme['bg']">
                                        <template v-slot:title>Category</template>
                                        <template v-slot:value>{{inter?.category}}</template>
                                    </Pill>
                                </div>
                            </div>
                        </details>
                    </li>
                </ul>
            </div>
            <!-- 🦄 Curation 🦄 -->
            <div  v-if="item?.curatedBy" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2">
                <h3 class="font-light text-2xl mb-2" :class="theme['text']">Curated by</h3>
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
            <!-- 🦄 Authors 🦄 -->
            <div v-if="authors.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <template v-if="authorsByInstitution">
                    <h3 class="font-light text-2xl mb-2 text-center" :class="theme.text">Authors</h3>
                    <details v-for="(authors, institution) in authorsByInstitution" :open="authors.length < 5 ? true : false" :key="institution" class="mb-2">
                        <summary class="font-bold cursor-pointer">
                            <i class="fas fa-building" :class="theme.text"></i> {{institution}} <span :class="theme.text">({{authors.length}})</span>
                        </summary>
                        <div class="p-1 ml-3 rounded bg-gray-200 dark:bg-gray-700">
                            <ul>
                                <li v-for="(author) in authors" :key="author" class="mb-2">
                                    <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                                        <i class="fas fa-search"></i> {{author}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </details>
                </template>
                <template v-else-if="authors">
                    <h3 class="font-light text-2xl mb-2 text-center" :class="theme.text">Authors</h3>
                    <template v-for="(author, i) in authors" :key="author">
                        <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                            <i class="fas fa-search"></i> {{author}} <span v-if="i < authors.length-1">, </span>
                        </router-link>
                    </template>
                </template>
            </div>
            <!-- 🦄 Funding 🦄 -->
            <div  v-if="item?.funding && item?.funding.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <h3 class="font-light text-2xl mb-2" :class="theme['text']">Funding</h3>
                <template v-for="(f, i) in item?.funding" :key="i">
                    <ul>
                        <li v-if="f?.funder">
                            <template v-for="(fx, y) in f?.funder" :key="y + 'fx'">
                                <i class="fas fa-award" :class="theme.text"></i> {{fx?.name ? fx.name : fx}} <b>({{fx?.role || 'unknown role'}})</b>
                            </template>
                        </li>
                        <li v-else>
                            <i class="fas fa-award" :class="theme.text"></i> {{f}}
                        </li>
                    </ul>
                </template>
                
            </div>
            <!-- 🦄 Distribution 🦄 -->
            <div  v-if="item?.distribution && item?.distribution.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <h3 class="font-light text-2xl mb-2" :class="theme['text']"> Downloads</h3>
                <table class="table-auto text-left">
                    <thead class="text-gray-400">
                        <tr>
                            <th>Name</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(link, i) in item?.distribution" :key="i + 'dist'">
                            <td class="p-2">
                                {{link.name || 'file'}}
                            </td>
                            <td class="p-2">
                                <a class="px-4 py-1 bg-tertiary hover:bg-tertiary-light !text-white rounded-xl" :href="link?.contentUrl" target="_blank" rel="nonreferrer">
                                    <i class="fas fa-download"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 🦄 Citations 🦄 -->
        <div v-if="item?.citedBy && item?.citedBy.length" class="bg-gray-100 dark:bg-gray-700 p-4 w-full">
            <ExpandableSection :color="theme['text']" :expanded="false">
                    <template v-slot:title>
                        CITATIONS <b>({{item?.citedBy.length}})</b>
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
        <!-- 🦄 Keywords 🦄 -->
        <div v-if="item?.keywords" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.keywords" :key="tag + i">
                <router-link class="text-sm text-white hover:text-tertiary-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
            </template>
        </div>
    </div>
</template>

<script>
import Description from '../ExpandableDescription.vue'

export default {
    name: "ClinicalTrialResult",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
        Description,
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