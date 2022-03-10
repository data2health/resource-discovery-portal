<template>
    <div class="relative rounded-md hover:bg-gray-400/25 p-1 cursor-pointer dark:text-gray-300" 
    @mouseenter="cls ='opacity-100'" 
    @mouseleave="cls ='opacity-0'" 
    v-if="(text && text.length > 200) && !text.includes('</')">
        <p class="inline" @click.prevent="expanded = !expanded">{{expanded ? text : text.substring(0, 200) + "..."}} <span v-if="!expanded" class="text-accent cursor-pointer">(see more)</span></p>
        <span class="ml-3 inline" :class="cls">
            <CopyButton :copy="text" copy_msg="Copy Text"></CopyButton>
        </span>
    </div>
    <p class="text-gray-400 text-sm" v-else-if="!text">
        No Description Available
    </p>
    <template v-else>
        <p class="text-sm dark:text-gray-300" v-html="text"></p>
    </template>
</template>

<script>
import CopyButton from './CopyButton.vue'

export default {
    name: 'ExpandableDescription',
    data:function(){
        return {
            cls: 'opacity-0'
        }
    },
    components:{
        CopyButton
    },
    props: {
        text: [String, Number],
        expanded:{
            type: Boolean,
            default: false
        }
    }
}
</script>