<template>
    <div class="p-2 rounded-sm relative border-t-gray-300 border-t-2">
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
            <div class="text-md font-regular p-6 pt-2 text-gray-500 dark:text-white flex justify-between items-center">
                <div class="ml-2 p-3 rounded border border-gray-200 text-xs">
                    <!-- url -->
                    <p v-if="item.url">
                        <a :href="item.url" target="_blank" rel="nonreferrer">Source <i class="fas fa-external-link-square-alt" :class="theme.text"></i></a>
                    </p>
                    <!-- overall_officials -->
                    <template v-if="overall_officials">
                        <p class="mt-2" :class="theme.text">Officials:</p>
                        <!-- short list -->
                        <template v-if="overall_officials.length < 11">
                            <small class="mb-1" v-for="(official, i) in overall_officials" :key="official">
                                {{official}} <span v-if="i < overall_officials.length-1">, </span>
                            </small>
                        </template>
                        <!-- long hover -->
                        <template v-else>
                            <Popper :content="JSON.stringify(overall_officials)" class="tip" :hover="true" placement="right" arrow>
                                <span>(<span :class="theme.text">{{overall_officials.length}}</span>) overall_officials</span>
                            </Popper>
                        </template>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

export default {
    name: "ClinicalTrialResult",
    props:{
        item: Object,
        fullView: Boolean,
        theme: Object
    },
    components:{
    },
    computed:{
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