<template>
    <Popper :content="copy_msg" class="tip" :hover="true" placement="top">
        <button v-bind="$attrs" 
        class="hover:!bg-accent-light text-white mx-1 icon-btn" 
        :data-clipboard-text="copy" 
        :class="['cp'+badgeID, color]">
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
    props:{
        'copy':{
            type: String,
            default:''
        },
        'copy_msg':{
            type: String,
            default:''
        },
        'color':{
            type: String,
            default:'bg-gray-300 dark:bg-gray-600'
        }
    },
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