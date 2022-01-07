<template>
  <div class="dm py-10 text-gray-700 dark:text-gray-400">
    <div class="min-h-screen max-w-screen-lg m-auto space-y-28">

      <section class="space-y-10 mb-4 p-3">
        <h1 class="text-6xl mb-6 text-main dark:text-secondary-light">About the Resource Discovery Portal <i class="fas fa-plus text-secondary-light"></i> CD2H</h1>
        <p>
          The CTSA National Center for Data to Health (CD2H) accelerates advancements in informatics by utilizing findable, accessible, interoperable, and reusable (FAIR) principles to promote collaboration across the Clinical and Translational Science Awards (CTSA) Program community.
        </p>
      </section>

      <section class="space-y-10 mb-4 p-3">
        <h1 class="text-6xl mb-6 text-main dark:text-secondary-light">What we provide</h1>
        <ul>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </li>
        </ul>
      </section>

      <section class="space-y-10 mb-4 p-3">
        <h1 class="text-6xl mb-6 text-main dark:text-secondary-light">Our Data</h1>
        <img class="w-3/4 m-auto" src="/assets/img/sources.jpg" alt="Our Data">
      </section>

      <section class="space-y-10 mb-4 p-3">
        <h1 class="text-6xl mb-6 text-main dark:text-secondary-light">The Project</h1>
        <h2 class="text-3xl">
          History
        </h2>
        <p>
          Etiam arcu lectus, commodo a venenatis in, aliquam vel augue. Sed auctor, dui et vehicula convallis, lorem nisl convallis diam, in egestas velit nisi et dui. Nulla at nisl non ex vulputate vehicula. Nunc dictum orci id lacus vulputate fermentum. Morbi tristique cursus felis, vel bibendum libero convallis non. Proin non tortor eu nisi feugiat maximus. Proin in diam suscipit, volutpat neque ac, laoreet est. Mauris luctus, neque eget porttitor maximus, lorem ipsum tincidunt sapien, ut laoreet libero mi in magna. Morbi fermentum, ligula ac porttitor posuere, lacus neque dictum massa, sed consectetur urna erat vitae augue.
        </p>
        <h2 class="text-3xl">
          About CD2H
        </h2>
        <p>
          Donec semper pharetra luctus. Nunc quam massa, feugiat ac rutrum at, elementum dignissim dui. In porttitor magna justo, bibendum blandit nunc sagittis ultricies. Pellentesque sem ipsum, lacinia sed tortor ac, mollis sagittis ipsum. Ut risus nisl, scelerisque sed est vitae, pharetra accumsan turpis. Sed finibus iaculis felis, nec hendrerit arcu auctor eget. Nam ac ligula et felis feugiat convallis. Vivamus metus felis, gravida in molestie sit amet, egestas non massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc cursus orci in dolor sodales, non accumsan nunc vehicula. Mauris a quam metus. Phasellus scelerisque eu nisl dapibus vulputate. Morbi sollicitudin ex nec neque feugiat condimentum.
        </p>
      </section>

      <section class="mb-4 p-3 w-full">
        <h1 class="text-6xl mb-6 text-main dark:text-secondary-light">The Team</h1>
        <div class="text-center font-light text-2xl">
          <template v-for="(members, organization) in team" :key="organization">
            <div class="flex justify-center p-10">
              <img v-if="organization == 'Scripps Research'" src="/assets/img/scripps.png" class="h-10">
              <img v-if="organization == 'University of Iowa'" src="/assets/img/uiowa.png" class="h-20">
              <img v-if="organization == 'Sage'" src="/assets/img/sage.svg" class="h-10">
            </div>
            <div class="flex justify-around flex-wrap items-center space-y-10">
              <template v-for="member in members" :key="member.name">
                <PersonCard :person="member"></PersonCard>
              </template>
            </div>
          </template>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PersonCard from '../components/PersonCard.vue'

export default {
  name: 'About',
  computed:{
        ...mapGetters([
            'team'
        ]),
  },
  components:{
    PersonCard
  }
}
</script>
