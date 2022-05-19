<template>
    <a href="javascript:void(0);" class="font-bold text-sm opacity-0" @click.prevent="as_open = !as_open"><i class="fas fa-cog"></i> Advanced Search</a>
    <!-- cookie consent -->
    <VModal v-model="as_open" @confirm="as_open = false">
        <template v-slot:title>
            <h2 class="text-main dark:text-white">
                <i class="fas fa-cog" :class="{'animate-spin': loading}"></i> Advanced Search <span class="text-center text-red-400" v-if="loading">Updating Results...</span>
            </h2>
        </template>
        <template v-slot:content>
            <div class="p-1 w-full space-y-4 dark:text-gray-200">
                <form @submit.prevent="submitAdvancedFilters($event)" class="space-y-2" id="generalAF">
                    <div class="space-x-2 p-1">
                        <input name="curatedBy" id="curation" type="checkbox" class="form-checkbox" value="_exists_:curatedBy">
                        <label for="curation">Curated</label>
                    </div>
                    <div class="space-x-2 p-1">
                        <input name="!curatedBy" id="not_curation" type="checkbox" class="form-checkbox" value="!_exists_:curatedBy">
                        <label for="not_curation">Not Curated</label>
                    </div>
                    <div class="space-x-2 p-1">
                        <h6>Date Created</h6>
                        <table>
                            <tr>
                                <td>
                                    <label for="created_from">From</label>
                                </td>
                                <td>
                                    <input name="dateCreated:from" id="created_from" type="date" class="form-checkbox w-32 p-3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="created_to">To</label>
                                </td>
                                <td>
                                    <input name="dateCreated:to" id="created_to" type="date" class="form-checkbox w-32 p-3">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="space-x-2 p-1">
                        <h6>Date Modified</h6>
                        <table>
                            <tr>
                                <td>
                                    <label for="dm_from">From</label>
                                </td>
                                <td>
                                    <input name="dateModified:from" id="dm_from" type="date" class="form-checkbox w-32 p-3">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="dm_to">To</label>
                                </td>
                                <td>
                                    <input name="dateModified:to" id="dm_to" type="date" class="form-checkbox w-32 p-3">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="space-x-2 p-1">
                        <h6>Dataset</h6>
                        <ExpandableSection>
                            <template v-slot:title>
                                <h6 class="inline">Data Format</h6>
                            </template>
                            <template v-slot:value>
                                <div class="space-x-2 p-1">
                                    <input name="format" id="format_xml" type="checkbox" class="form-checkbox" value="XML">
                                    <label for="format_xml">XML</label>
                                </div>
                                <div class="space-x-2 p-1">
                                    <input name="format" id="format_json" type="checkbox" class="form-checkbox" value="JSON">
                                    <label for="format_json">JSON</label>
                                </div>
                            </template>
                        </ExpandableSection>
                    </div>
                    <div class="flex justify-between items-center p-1 space-x-2">
                        <button class="bg-main text-white rounded-md px-2 py-1" type="submit">Apply</button>
                        <button class="bg-red-800 text-white rounded-md px-2 py-1" type="reset">Reset</button>
                    </div>
                    
                </form>
                <!-- <AdvancedFilters></AdvancedFilters> -->
            </div>
        </template>
    </VModal>
</template>

<script>
import { mapGetters } from 'vuex'

// import FilterList from '../components/FilterList.vue'
// import AdvancedFilters from '../components/AdvancedFilters.vue'

export default {
    name: "AdvancedSearch",
    data: function(){
        return {
            as_open: false
        }
    },
    components:{
        // FilterList,
        // AdvancedFilters
    },
    computed:{
        ...mapGetters([
            'filters',
            'loading',
            'typeFilters'
        ]),
    },
    methods:{
        submitAdvancedFilters(e){
            let form = new FormData(e.target);
            for(var pair of form.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }
        }
    }
}
</script>