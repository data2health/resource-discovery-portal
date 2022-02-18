<template>
    <span class="font-bold text-blue-500 hover:text-blue-400 cursor-pointer" @click.prevent="preview_open = !preview_open">
        {{name}}
    </span>
    <!-- cookie consent -->
    <VModal v-model="preview_open" @confirm="preview_open = false">
        <template v-slot:title>
            <h2 class="text-main text-sm md:text-xl">
                {{name}}
            </h2>
        </template>
        <template v-slot:content>
            <div class="w-full bg-gray-100 dark:bg-gray-700 text-sm md:text-md overflow-scroll">
                <template v-for="(item, field) in content" :key="field">
                    <FieldBox :content="item" :name="field" :isChild="false" :theme="theme"></FieldBox>
                </template>
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