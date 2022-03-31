<template>
  <!-- hero -->
  <div class="darkMode z-50">
    <div class="min-h-[60vh] m-auto flex items-center justify-center bg-no-repeat bg-cover bg-bottom flex-wrap md:flex-nowrap">
      <div class="relative w-full min-h-[60vh]">
        <div class="w-2/3 absolute z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">

          <div class=" w-full m:w-2/3 m-auto px-5 space-y-5">
            <h1 class=" md: text-center text-main dark:text-white">
              CD2H <b>R</b>esource <b>D</b>iscovery <b>P</b>ortal
            </h1>
            <p v-if="totalDocsRDP" data-aos="fade-in" class="text-center  md: font-bold text-gray-600 dark:text-accent mb-7">
              <span>{{$filters.numberWithCommas(totalDocsRDP)}}</span> resources and counting...
            </p>
            <p class=" md: text-center font-extrabold text-gray-600 dark:text-white">Start your search here</p>
            <SearchBar class="w-full md:w-2/3 m-auto"></SearchBar>
            <p class=" md: text-center text-gray-600 dark:text-white font-bold">Or explore our resources by type</p>
            <p class="text-center mt-5">
              <router-link class="btn-main m-auto" to="/resources">Resource&nbsp;Types</router-link>
            </p>
          </div>
        </div>
        <div class="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-10 overflow-hidden opacity-75">
          <RotatingCards class="-rotate-45"></RotatingCards>
        </div>
      </div>
    </div>
    <div class="z-20">
      <!-- SECTIONS -->
      <div class="mx-auto">
          <!-- section -->
          <section class="flex  items-start min-h-[50vh] bg-main text-white flex-wrap md:flex-nowrap">
            <div class="w-full md:w-2/6 md:sticky top-10 py-10 px-20">
              <h2 class=" md: font-bold ">
                What is the CD2H Resource Discovery Portal?
              </h2>
            </div>
            <div class="w-full md:w-4/6 leading-snug space-y-5 p-4 md:p-20 md:  m-0">
              <!-- <div class="h-1/3 w-1/3 bg-gray-400 m-auto"></div> -->
              <img src="/assets/img/rdp_dark.svg" alt="Resource Discovery Portal" class="w-1/3 m-auto">
              <p>The CD2H Resource Discovery Portal (RDP) is a single location to start your search for bioinformatics resources. <br>The platform draws from over 50 databases and covers over 20,000,000 total resources. You can accomplish a wide range of tasks with this single interface to search for many types of resources, including datasets, journal articles, Youtube videos, GitHub profiles, funding opportunities and more.</p>
              <p class="text-center p-10">
                <router-link class="btn-main m-auto  md:border-accent-light md:text-main" to="/about">Learn More</router-link>
              </p>
            </div>
          </section>
          <!-- section -->
          <section class="min-h-[50vh]">
            <div class="w-full top-10 py-10 px-20">
              <h2 class=" md: font-bold text-gray-600 dark:text-secondary-light text-center">
                A central space to search for...
              </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-1 w-full p-4 md:p-20 max-w-7xl m-auto">
                <SmallCard 
                title="Dataset"
                :items="['A Nuclease DNA complex', 'Hair follicle and skin molecular signatures']"></SmallCard>
                <SmallCard 
                title="Tool"
                :items="['Omics Integrator', 'Data Driven Ontology']"></SmallCard>
                <SmallCard 
                title="Research Instrument"
                :items="['Hamilton Anxiety Scale (HAM-A)','Multidimensional Fatigue Inventory ']"></SmallCard>
                <SmallCard 
                title="Publication"
                :items="['Human antiviral B cell responses: Emerging lessons from hepatitis B and COVID-19', 'Lung Ultrasound in Patients With Dyspnea From Infective Lung Disease']"></SmallCard>
                <SmallCard 
                title="Clinical Trial"
                :items="['Pilot Evaluation of a New Galyfilcon A Lens Prototype and Enfilcon A Lens', 'A Phase I Clinical Study of a GamLPV, a Live Intranasal Bordetella Pertussis Vaccine']"></SmallCard>
                <SmallCard 
                title="Grant"
                :items="['Omics Integrator', 'Data Driven Ontology']"></SmallCard>
                <SmallCard 
                title="Education Resource"
                :items="['An Overview of Survey Design','Managing Communication and Conflict']"></SmallCard>
                <!-- Others -->
                <div class="shadow-md rounded-xl m-2 dark:bg-gray-700 w-full md:w-64 group bg-gray-200 text-center">
                    <div class="flex justify-center items-start p-2">
                      <h5 class="font-bold  md: text-gray-700 dark:text-gray-400 order-2 md:order-1">
                          <router-link :to="{name:'Resources'}">And More...</router-link>
                      </h5>
                    </div>
                </div>

              </div>
              <div class="w-full p-10 text-center flex justify-center items-center">
                <router-link :to="{name:'Resources'}" class="btn-main text-main font-bold hover:text-white">
                  Search By Resource
                </router-link>
              </div>
          </section>
          <!-- section -->
          <section class="flex items-start min-h-[50vh] bg-main text-white bg-no-repeat bg-right-bottom flex-wrap md:flex-nowrap" 
          style="background-image: url('/assets/img/bg_dark.svg')">
            <div class="w-full md:w-2/6 md:sticky top-10 py-10 px-20">
              <h2 class=" md: font-bold">
                How is this platform being used?
              </h2>
            </div>
            <div class="w-full md:w-4/6 leading-snug space-y-5 p-4 md:p-20">
              <Carousel></Carousel>
            </div>
          </section>

        </div>
    </div>
    <!-- cookie consent -->
    <Modal v-if="cookiesWarning">
      <template v-slot:title>
        <h2 class="text-main"><i class="fas fa-cookie-bite text-orange-300"></i> RDP Analytics &amp; Cookies</h2>
      </template>
      <template v-slot:content>
        <p class="">
          This website may set analytics technologies, cookies or use similar technologies on your device in order to provide an improved user experience.<br>
          Allowing this us to show you more relevant data and improves your usage experience. We also use it in order to measure results or align our website content. 
          <router-link class="font-bold" to="/privacy">Learn more</router-link> about how this website uses cookies.<br>
          <b>By continuing to use this website you are giving consent to cookies being used.</b>
        </p>
      </template>
    </Modal>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import SmallCard from '../components/SmallCard.vue'
import RotatingCards from '../components/RotatingCards.vue'
import SearchBar from '../components/SearchBar.vue'
import Carousel from '../components/ExampleCarousel.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      query:'',
      cookiesWarning: false
    }
  },
  components: {
    SmallCard,
    RotatingCards,
    SearchBar,
    Carousel
  },
  methods:{
    search(){
      this.$router.push({ path: '/search', query: { 'q': this.query }});
    },
    checkCookieNotification(){
      if(!sessionStorage.getItem("rdp_cookies_warning")) {
        this.cookiesWarning = true;
        sessionStorage.setItem("rdp_cookies_warning", "true");
      }else{
        this.cookiesWarning = false;
      }
    }
  },
  mounted: function(){
    this.checkCookieNotification();
  },
  computed:{
      ...mapGetters([
        'darkMode',
        'totalDocsRDP'
      ]),
    },
}
</script>
