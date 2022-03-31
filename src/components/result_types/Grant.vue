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
            <Pill :color="theme['bg']">
                <template v-slot:title>ARRA Funded</template>
                <template v-slot:value>
                    <template v-if="item?.arra_funded == true">
                        <i  class="fas fa-check-circle text-green-300"></i>
                    </template>
                    <i v-else-if="item?.arra_funded == false" class="fas fa-times text-red-400"></i>
                    <span v-else>Not Provided</span>
                </template>
            </Pill>
            <Pill :color="theme['bg']">
                <template v-slot:title>Funding Year</template>
                <template v-slot:value>{{item?.fy || 'N/A'}}</template>
            </Pill>
        </div>

        <div class="bg-gray-100 dark:bg-gray-700 p-2" v-if="item?.funding_ic">
            <div class="flex justify-center items-center flex-col space-y-2">
                <h2 class=" font-bold">Grant Information</h2>
                <div class="flex justify-between w-1/4 m-1" v-for="funding, i in item?.funding_ic" :key="'f' + i">
                    <h2 class=" font-bold">{{funding?.ic}}</h2>
                    <h2 class=" font-bold" :class="theme.text">${{$filters.numberWithCommas(funding?.funding)}}</h2>
                </div>
                <h2 class=" font-bold" v-if="item?.award_notice_date">Notice Date: {{$filters.formatDate(item?.award_notice_date)}}</h2>
            </div>
            <!-- 🦄 Project 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 flex justify-around items-center space-y-1 m-2 w-full">
                <!-- start -->
                <span v-if="item?.project_start" class="">
                    Project Start <i class="fas fa-chevron-right" :class="theme.text"></i> <b>{{$filters.formatDate(item?.project_start)}}</b>
                </span>
                <!-- end -->
                <span v-if="item?.project_end" class="">
                    Project End <i class="fas fa-chevron-right" :class="theme.text"></i> <b>{{$filters.formatDate(item?.project_end)}}</b>
                </span>
            </div>
        </div>
        
        <div class="flex justify-around flex-wrap items-center p-2">
            <!-- 🦄 Budget 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 shadow-md flex justify-around items-center space-y-1 m-2 w-full">
                <!-- start -->
                <span v-if="item?.budget_start" class="">
                    <i class="fas fa-money-bill" :class="theme.text"></i> Budget Start <i class="fas fa-chevron-right" :class="theme.text"></i> <b>{{$filters.formatDate(item?.budget_start)}}</b>
                </span>
                <!-- end -->
                <span v-if="item?.budget_end" class="">
                    <i class="fas fa-money-bill" :class="theme.text"></i> Budget End <i class="fas fa-chevron-right" :class="theme.text"></i> <b>{{$filters.formatDate(item?.budget_end)}}</b>
                </span>
            </div>
            <!-- 🦄 Costs 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <h3 class="font-light  mb-2 text-center" :class="theme.text">Costs</h3>
                <table class="table-auto">
                    <tbody>
                        <tr>
                            <td>
                                Sub Project Total
                            </td>
                            <td :class="theme.text">
                                ${{$filters.numberWithCommas(item?.total_cost_sub_project|| ' N/A')}}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total
                            </td>
                            <td :class="theme.text">
                                ${{$filters.numberWithCommas(item?.total|| ' N/A')}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 🦄 ORG 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <h3 class="font-light  mb-2 text-center" :class="theme.text">Organization</h3>
                <div>
                    <table class="table-auto">
                        <tbody>
                            <tr>
                                <td>
                                    <i class="fa fa-building" :class="theme.text"></i>
                                </td>
                                <td>
                                    {{item?.org_name|| '-'}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i class="fa fa-map-marker" :class="theme.text"></i>
                                </td>
                                <td>
                                    {{item?.org_city|| '-'}},  {{item?.org_state || '-'}}  {{item?.org_country || '-'}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- 🦄 Authors 🦄 -->
            <div v-if="authors.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <template v-if="authorsByInstitution">
                    <h3 class="font-light  mb-2 text-center" :class="theme.text">Principal Investigators</h3>
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
                    <h3 class="font-light  mb-2 text-center" :class="theme.text">Principal Investigators</h3>
                    <template v-for="(author, i) in authors" :key="author">
                        <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                            <i class="fas fa-search"></i> {{author}} <span v-if="i < authors.length-1">, </span>
                        </router-link>
                    </template>
                </template>
            </div>
        </div>
        <div v-if="item?.term" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.term" :key="tag + i">
                <router-link v-if="tag?.term" class=" text-white hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag?.term + `"`}}'>
                    <i class="fas fa-hashtag" :class="theme?.text"></i> {{tag?.term}}
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Grant",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
        PopUpPreview,
    },
    computed:{
        authors: function(){
            if (this.item && this.item?.pi) {
                return this.item?.pi.map(item => item?.pi_name);
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
            let possibleFields = ['study_section', 'study_section_name', 'activity', 
            'support_year', 'application_type', 'serial_number', 'spending_category'];

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