<template>
    <!--🦄 Type Specific Content 🦄-->
    <div class="p-2 rounded-sm relative border-t-gray-300 border-t-2 space-y-3">
        <h1 v-if="fullView" class="font-light text-2xl" :class="theme['text']">DETAILS</h1>
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
            <!-- DOI -->
            <p v-if="item?.doi">
                <a :href="item?.doi" target="_blank" rel="nonreferrer">DOI <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
            </p>
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
    </div>
</template>

<script>
import PopUpPreview from '../PopUpPreview.vue'

export default {
    name: "Protocol",
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
    }
}
</script>