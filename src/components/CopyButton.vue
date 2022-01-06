<template>
<Popper :content="copy_msg" class="tip" :hover="true" placement="top">
    <button v-bind="$attrs" 
    class="icon-btn rounded-xl bg-main hover:bg-main-light 
    copyBtn dark:bg-secondary-light dark:hover:bg-secondary" 
    :data-clipboard-text="copy" 
    :class="['cp'+badgeID, cls]">
        <slot></slot> <i class="fas fa-copy text-white"></i>
    </button>
</Popper>
</template>

<script>
import ClipboardJS from "clipboard"

export default {
    name: 'CopyButton',
    data: function(){
        return{
            badgeID: Math.floor(Math.random()*90000) + 10000,
            cls: '',
            showAnimation: false
        }
    },
    props:{
        copy:{
            type: String,
            default:''
        },
        copy_msg:{
            type: String,
            default:'Copy'
        }
    },
    mounted:function(){
        let self = this;
        var clipboard = new ClipboardJS('.copyBtn');
        ClipboardJS.isSupported();
        
        clipboard.on('success', function(e) {
            self.$toast.success(`Copied!`);
        });
    }

}
</script>