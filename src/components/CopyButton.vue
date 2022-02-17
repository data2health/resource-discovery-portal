<template>
    <Popper :content="copy_msg" class="tip" :hover="true" placement="top">
        <button v-bind="$attrs" 
        class="bg-tertiary hover:bg-tertiary-light text-white mx-1 px-2 py-1 rounded-lg text-xs" 
        :data-clipboard-text="copy" 
        :class="['cp'+badgeID]">
            <slot></slot> <i class="fas fa-clipboard"></i>
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