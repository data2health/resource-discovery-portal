<template>
    <!--🦄 Type Specific Content 🦄-->
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
        </div>
        
        <div class="flex justify-around flex-wrap items-center p-2">
            <div class="bg-gray-100 dark:bg-gray-700 p-2 w-full" v-if="item?.terms_of_use">
                <div class="flex justify-center items-center flex-col space-y-2">
                    <h2 class="text-xl font-bold">Terms of Use</h2>
                    <p>{{item?.terms_of_use}}</p>
                </div>
            </div>
            <!-- 🦄 Project 🦄 -->
            <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 flex justify-around items-center space-y-1 m-2 w-full">
                <!-- start -->
                <span v-if="item?.date_added" class="text-sm">
                    Date Added <i class="fas fa-chevron-right" :class="theme.text"></i> <b>{{$filters.formatDate(item?.date_added)}}</b>
                </span>
            </div>
            <!-- 🦄 Authors 🦄 -->
            <div v-if="authors.length" class="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 m-2">
                <template v-if="authorsByInstitution">
                    <h3 class="font-light text-2xl mb-2 text-center" :class="theme.text">Principal Investigators</h3>
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
                    <h3 class="font-light text-2xl mb-2 text-center" :class="theme.text">Principal Investigators</h3>
                    <template v-for="(author, i) in authors" :key="author">
                        <router-link :to='{path: "/search", query:{"q": `"` + author + `"`}}'>
                            <i class="fas fa-search"></i> {{author}} <span v-if="i < authors.length-1">, </span>
                        </router-link>
                    </template>
                </template>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 p-2" v-if="item?.acknowledgement">
                <div class="flex justify-center items-center flex-col space-y-2">
                    <h2 class="text-md font-bold">Acknowledgement</h2>
                    <p>{{item?.acknowledgement}}</p>
                </div>
            </div>
        </div>
        <div v-if="item?.term" class="space-x-2 bg-gray-500 dark:bg-gray-900 p-4 w-full">
            <template v-for="(tag, i) in item?.term" :key="tag + i">
                <router-link v-if="tag?.term" class="text-sm text-white hover:text-accent-light underline" :to='{path: "/search", query:{"q": `"` + tag?.term + `"`}}'>
                    <i class="fas fa-hashtag" :class="theme?.text"></i> {{tag?.term}}
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Instrument",
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
            let possibleFields = ['download_count'];

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