<template>
    <template v-if="showFB">
        <div data-aos="fade-up-right" class="shadow-lg rounded-xl bg-secondary-light p-4 text-white
            bottom-5 right-5 left-5 flex justify-center items-center w-64 sticky">
            <a href="#" class="text-white">Send us feedback!</a> <button @click="closeFB()" class="py-1 px-1 icon-btn"><i class="fas fa-times"></i></button>
        </div>
    </template>
</template>

<script>
export default {
    name: 'Feedback',
    data: function(){
        return {
            showFB: false
        }
    },
    methods:{
        closeFB(){
            sessionStorage.setItem('feedback', '')
            this.showFB = sessionStorage.feedback;
        }
    },
    mounted: function(){
        this.showFB = sessionStorage.getItem('feedback');
    }
}
</script>