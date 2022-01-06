<template>
  <!-- Resources Available -->
    <div class="flex items-center justify-center">
      <div class="p-8">
        <h1 class="text-main text-center font-thin text-4xl dark:text-tertiary mb-7 mt-5">Resources Available</h1>
        <div  class="flex flex-wrap justify-center items-center">
          <!-- types -->
          <template v-for="(info, type) in resourceTypes" :key="type">
            <div v-if="type !== 'ALL'" class="border border-gray-200 shadow-sm hover:shadow-md px-5 py-2 text-center m-2 rounded-full">
              <h2 class="text-secondary">
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