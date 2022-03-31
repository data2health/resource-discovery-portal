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
        <!-- 🦄 Usage License 🦄 -->
        <div v-if="item?.license">
            <License :url="item?.license"></License>
        </div>
        <div class="flex justify-around flex-wrap items-center p-2">
            <!-- 🦄 downloadUrl 🦄 -->
            <div  v-if="item?.downloadUrl" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2">
                <h3 class="font-light  mb-2" :class="theme['text']">Downloads</h3>
                <div>
                    <a class="px-4 py-1 bg-accent hover:bg-accent-light !text-white rounded-xl" :href="item?.downloadUrl" target="_blank" rel="nonreferrer">
                        <i class="fas fa-download"></i> Download <b v-if="item?.softwareVersion">{{item?.softwareVersion}}</b>
                    </a>
                </div>
            </div>
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
            <!-- 🦄 Authors 🦄 -->
            <div v-if="authors.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <template v-if="authorsByInstitution">
                    <h3 class="font-light  mb-2 text-center" :class="theme.text">Authors</h3>
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
                    <h3 class="font-light  mb-2 text-center" :class="theme.text">Authors</h3>
                    <template v-for="(author, i) in authors" :key="author">
                        <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                            <i class="fas fa-search"></i> {{author}} <span v-if="i < authors.length-1">, </span>
                        </router-link>
                    </template>
                </template>
            </div>
            <!-- 🦄 Funding 🦄 -->
            <div  v-if="item?.funding && item?.funding.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <h3 class="font-light  mb-2" :class="theme['text']">Funding</h3>
                <ul>
                    <li v-for="(item, i) in item?.funding" :key="i + 'fund'">
                        <i class="fas fa-award" :class="theme.text"></i> {{item?.description}}
                    </li>
                </ul>
            </div>
            <!-- 🦄 Distribution 🦄 -->
            <div  v-if="item?.distribution && item?.distribution.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-center items-center flex-col space-y-1 m-2 w-full">
                <h3 class="font-light  mb-2" :class="theme['text']"> Downloads</h3>
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
                                <a class="px-4 py-1 bg-accent hover:bg-accent-light !text-white rounded-xl" :href="link?.contentUrl" target="_blank" rel="nonreferrer">
                                    <i class="fas fa-download"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                                <Description class="" :text="citation.citation"></Description>
                            </template>
                        </template>
                </ExpandableSection>
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
import Description from '../ExpandableDescription.vue'
import License from '../License.vue'
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Tool",
    data: function () {
        return {
            uniqueID: Math.floor(Math.random()*90000) + 10000,
            showDetails: false
        }
    },
    components:{
        Description,
        License,
        PopUpPreview
    },
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
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
            let possibleFields = ['toolType', 'language', 'cost', 'accessibility', 'softwareVersion'];

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