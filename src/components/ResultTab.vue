<template>
    <a v-if="fullView" class="cursor-pointer mr-7" @click="$router.go(-1)"><i class="fas fa-chevron-left"></i> Go Back </a>
    <div class="p-1 rounded-t-xl text-xs inline-block min-w-[20%]" :class="theme.bg">
        <h3 class="p-1 capitalize flex justify-start items-center text-white" :class="[fullView ? 'text-2xl' : '']">
            <img :src="theme.img" :alt="name" class="h-5 mr-2"> {{name}}
        </h3>
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