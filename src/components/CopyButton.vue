<template>
    <Popper :content="copy_msg" class="tip" :hover="true" placement="top">
        <button v-bind="$attrs" 
        class="bg-gray-300 dark:bg-gray-600 hover:!bg-accent-light text-white mx-1 icon-btn " 
        :data-clipboard-text="copy" 
        :class="['cp'+badgeID]">
            <slot></slot> <i class="far fa-copy"></i>
        </button>
    </Popper>
</template>

<script>
import ClipboardJS from "clipboard"

export default {
    name: 'CopyButton',
    data: function(){
        return{
            badgeID: Math.floor(Math.random()*90000) + 10000
        }
    },
    props:['copy', 'copy_msg'],
    mounted:function(){
        let self = this;
        var clipboard = new ClipboardJS('.cp'+this.badgeID);
        ClipboardJS.isSupported();
        
        clipboard.on('success', function(e) {
            self.$toast.success(`Copied!`);
        });
    }

}
</script>