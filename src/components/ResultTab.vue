<template>
    <a v-if="fullView" class="cursor-pointer" @click="$router.go(-1)"><i class="fas fa-chevron-left"></i> Go Back </a>
    <div class="p-1 rounded-t-xl text-xs inline-block min-w-[20%]" :class="[cls]">
        <h3 class="text-white p-1 capitalize" :class="fullView ? 'text-2xl font-light' : ''">{{name}}</h3>
    </div>
</template>

<script>
export default {
    name: "ResultTab",
    props:['cls', 'name'],
    computed:{
        fullView: function () {
            // deeper > shallow
            return this.$route.name == 'ResultDetails' ? true : false;
        }
    }
}
</script>