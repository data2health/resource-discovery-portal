<template>
    <!--🦄 Type Specific Content 🦄-->
    <div class="p-2 rounded-sm relative border-t-gray-300 border-t-2 space-y-3">
        <!-- Full View Headers -->
        <h1 class="font-light text-2xl" :class="theme['text']">DETAILS</h1>
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
        <template v-if="fullView" data-aos="fade-in">
            <!-- stats box -->
            <div class="font-regular p-2 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 space-y-4">
                    <!-- 🦄 Curation 🦄 -->
                    <template v-if="item?.curatedBy">
                        <p class="mb-2" :class="theme.text">Curated by:</p>
                        <a v-if="item?.curatedBy?.url" :href="item?.curatedBy?.url" target="_blank" rel="nonreferrer">
                            {{item?.curatedBy?.name}} ({{$filters.formatDate(item?.curatedBy?.curationDate)}}) <i class="fas fa-external-link-square-alt" :class="theme.text"></i>
                        </a>
                        <p v-else>{{item?.curatedBy?.name}} ({{$filters.formatDate(item?.curatedBy?.curationDate)}})</p>
                    </template>
                    <!-- url -->
                    <p v-if="item?.url">
                        <a :href="item?.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- license -->
                    <p v-if="item?.license">
                        <a :href="item?.license" target="_blank" rel="nonreferrer">Usage License <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- 🦄 Authors 🦄 -->
                    <template v-if="authors || authorsByInstitution">
                        <p class="mt-2" :class="theme.text">Authors:</p>
                        <!-- if by institution -->
                        <template v-if="authorsByInstitution">
                            <p v-for="(authors, institution) in authorsByInstitution" :key="institution" class="mb-2">
                                <PopUpPreview :content="{'authors':authors}" :name="institution + ' (' + authors.length + ')'" :theme="theme"></PopUpPreview>
                            </p>
                        </template>
                        <!-- else list them-->
                        <template v-else-if="authors">
                            <!-- short list -->
                            <template v-if="authors.length < 11">
                                <p class="mb-1" v-for="(author, i) in authors" :key="author">
                                    {{author}} <span v-if="i < authors.length-1">, </span>
                                </p>
                            </template>
                            <!-- long hover -->
                            <template v-else>
                                <Popper :content="JSON.stringify(authors)" class="tip" :hover="true" placement="right" arrow>
                                    <span>(<span :class="theme.text">{{authors.length}}</span>) authors</span>
                                </Popper>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div v-if="item?.keywords">
                <template v-for="(tag, i) in item?.keywords" :key="tag + i">
                  <router-link class="text-sm text-tertiary hover:text-tertiary-light underline" :to='{path: "/search", query:{"q": `"` + tag + `"`}}'><i class="fas fa-hashtag" :class="theme?.text"></i> {{tag}}</router-link>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "DatasetResult",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
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
        pills: function() {
            let pills = [];
            // field containing values you want to display as pills
            let possibleFields = ['ID', 'types', 'privacy'];

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
}
</script>