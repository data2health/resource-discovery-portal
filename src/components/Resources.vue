<template>
  <!-- Resources Available -->
    <div class="flex items-center justify-center bg-white/75 dark:bg-black/25 rounded-xl shadow-xl mt-5">
      <div class="p-8">
        <h1 class="text-main text-center text-4xl dark:text-accent mb-7 mt-5 font-extralight">Search By Resource</h1>
        <div  class="flex flex-wrap justify-center items-center">
          <!-- types -->
          <template v-for="(info, type) in resourceTypes" :key="type">
            <router-link 
            to="/search" 
            v-if="type !== 'ALL'" 
            class="bg-main text-white border border-gray-200 shadow-sm hover:shadow-md px-5 py-2 text-center m-2 rounded-full">
              {{type}}
            </router-link>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Resources",
    computed:{
      ...mapGetters([
        'resourceTypes'
      ]),
    },
}
</script>