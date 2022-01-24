<template>
    <teleport to="#modals-go-here">
        <div class="h-screen absolute top-0 left-0 z-50" v-if="show">
        <div class="relative flex justify-center items-center w-screen h-screen z-50" @click="show = false">
            <div class="absolute top-2/3 p-4 text-left bg-gray-100 rounded-lg z-50 shadow-md max-w-lg" @click="show = true">
                <div class="text-gray-600">
                    <slot name="title">
                        
                    </slot>
                </div>
                <div class="text-gray-600">
                    <slot name="content">
                        
                    </slot>
                </div>
            </div>
        </div>
    </div>
    </teleport>
</template>

<script>
export default {
    name: 'SimpleModal',
    data: function(){
        return {
            show: true
        }
    }
}
</script>