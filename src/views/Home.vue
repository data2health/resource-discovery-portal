<template>
  <!-- hero -->
  <div class="h-screen m-auto dm">
    <div class="bg-grey-100 p-5 text-center max-w-screen-md m-auto">
      <h1 class="text-secondary-light text-5xl">Resource Discovery Portal</h1>
      <p class="my-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Cumque voluptates tempore perspiciatis laudantium obcaecati fugiat sunt tempora illo, 
        dicta dignissimos magnam voluptatum pariatur voluptate nobis aspernatur exercitationem odio neque? Nostrum.
      </p>
    </div>
    <!-- search -->
    <div class="bg-gradient-to-r from-main-dark to-secondary-dark p-5 flex justify-center items-center h-1/4">
      <Loader v-if="loading"></Loader>
      <div class="w-1/2">
        <form @submit.prevent="search()" class="w-full flex items-center">
          <input 
          type="text" 
          placeholder="search" 
          class="w-full m-auto py-2 px-4 text-2x text-main 
          rounded-full border border-transparent focus:outline-none focus:ring-2 
          focus:ring-secondary-light focus:border-transparent dark:bg-gray-300">
          <button type="submit" class="btn-main ml-2">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <span class="text-sm block mt-2 text-main-light">
            Eg. COVID-19 Datasets
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      loading: false
    }
  },
  components: {
    Loader
  },
  methods:{
    search(){
      console.log('searching...')
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
}
</script>
