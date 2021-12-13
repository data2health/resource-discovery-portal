<template>
  <!-- Resources Available -->
    <div class="flex items-center justify-center">
      <div class="p-8">
        <h1 class="text-main text-center font-thin text-4xl">Resources Available</h1>
        <div  class="flex flex-wrap justify-center items-center">
          <!-- types -->
          <template v-for="type in resourceTypes" :key="type">
            <div class="rounded border border-warmGray-400 shadow-sm hover:shadow-md p-2 text-center m-2">
              <h2>
                <i class="fas fa-book"></i> {{type}}
              </h2>
            </div>
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