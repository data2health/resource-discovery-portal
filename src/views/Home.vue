<template>
  <!-- hero -->
  <div class="h-screen m-auto dm">
    <div class="bg-grey-100 p-5 text-center max-w-screen-md m-auto">
      <img v-if="!darkMode" src="../../assets/img/rdp_color.svg" class="m-auto w-1/3">
      <img v-else src="../../assets/img/rdp_dark.svg" class="m-auto w-1/3">
      <p class="my-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Cumque voluptates tempore perspiciatis laudantium obcaecati fugiat sunt tempora illo, 
        dicta dignissimos magnam voluptatum pariatur voluptate nobis aspernatur exercitationem odio neque? Nostrum.
      </p>
    </div>
    <!-- search -->
    <div class="bg-gradient-to-r from-main to-secondary p-5 flex justify-center items-center h-1/4">
      <div class="w-1/2">
        <form @submit.prevent="search()" class="w-full flex items-center">
          <input 
          v-model="query"
          type="text" 
          placeholder="search" 
          class="w-full m-auto py-2 px-4 text-2x text-main 
          rounded-full border border-transparent focus:outline-none focus:ring-2 
          focus:ring-secondary-light focus:border-transparent dark:bg-gray-300">
          <button type="submit" class="btn-main ml-2">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <span class="text-sm block mt-2 text-white">
            Eg. COVID-19 Datasets
          </span>
      </div>
    </div>
    <Resources></Resources>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Resources from '../components/Resources.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      query:''
    }
  },
  components: {
    Resources
  },
  methods:{
    search(){
      this.$router.push({ path: '/search', query: { 'q': this.query }});
    }
  },
  computed:{
      ...mapGetters([
        'darkMode',
      ]),
    },
}
</script>
