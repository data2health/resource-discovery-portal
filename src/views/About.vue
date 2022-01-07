<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 dm">
    <div class="max-w-screen-md m-auto pt-9">
      <h1 class="text-blue text-6xl mb-6">About the Resource Discovery Portal <i class="fas fa-plus text-secondary-light"></i> CD2H</h1>
      <p>
        The CTSA National Center for Data to Health (CD2H) accelerates advancements in informatics by utilizing findable, accessible, interoperable, and reusable (FAIR) principles to promote collaboration across the Clinical and Translational Science Awards (CTSA) Program community.
      </p>
    </div>
    <div>
      <template v-for="member in team" :key="member.name">
        <p>{{member.name}}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed:{
        ...mapGetters([
            'team'
        ]),
    }
}
</script>
