<template>
    <span class="text-sm text-blue-500 dark:text-blue-300 hover:text-blue-400 cursor-context-menu" @click.prevent="preview_open = !preview_open">
        {{name}}
    </span>
    <!-- cookie consent -->
    <VModal v-model="preview_open" @confirm="preview_open = false">
        <template v-slot:title>
            <p class="text-main dark:text-white text-md">
                {{content?.name || name}}
            </p>
        </template>
        <template v-slot:content>
            <div class="bg-white dark:bg-gray-700">
                <table class="table-auto field-box-table shadow">
                    <tbody>
                        <template v-for="(item, field) in content" :key="field">
                            <FieldBox :content="item" :name="field" :isChild="false" :theme="theme"></FieldBox>
                        </template>
                    </tbody>
                </table>
            </div>
        </template>
    </VModal>
</template>

<script>
import FieldBox from './FieldBox.vue'

export default {
    name: 'PopUpPreview',
    data: function(){
        return {
            preview_open: false
        }
    },
    components:{
        FieldBox
    },
    props:{
        'content': Object,
        'name': String,
        'theme': Object
    },
}
</script>