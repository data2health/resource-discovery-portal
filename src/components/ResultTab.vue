<template>
    <a v-if="fullView" class="cursor-pointer mr-7" @click="$router.go(-1)"><i class="fas fa-chevron-left"></i> Go Back </a>
    <div class="p-1 rounded-t-xl text-xs inline-block min-w-[20%] font-bold" :class="theme.bg">
        <small class="p-1 capitalize flex justify-start items-center text-white" :class="[fullView ? '' : '']">
            <img :src="theme.img_white" :alt="name" class="h-5 mr-2"> {{name}}
        </small>
    </div>
</template>

<script>
export default {
    name: "ResultTab",
    props:{
        theme: Object,
        name: String
    },
    computed:{
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        }
    }
}
</script>