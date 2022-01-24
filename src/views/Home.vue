<template>
  <!-- hero -->
  <div class="dm">
    <div class="min-h-[60vh] m-auto flex items-center justify-center bg-no-repeat bg-cover bg-bottom flex-wrap md:flex-nowrap">
      <div class="relative w-full min-h-[60vh] overflow-hidden">
        <div class="w-2/3 absolute z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">

          <div class=" w-full m:w-2/3 m-auto px-5 space-y-5">
            <h1 class="text-xl text-center">Start your search here</h1>
            <form @submit.prevent="search()" class="w-full flex items-center justify-center flex-wrap">
              <input 
              v-model="query"
              type="text" 
              placeholder="search" 
              class="w-2/3 py-2 px-4 text-2x text-main
              rounded-full border-secondary dark:border-tertiary border-2 focus:outline-none focus:ring-2 
              focus:ring-secondary-light dark:focus:ring-tertiary-light focus:border-transparent dark:bg-gray-300 caret-pink-500 shadow-md">
              <button type="submit" class="btn-main ml-2">
                <i class="fas fa-search"></i>
              </button>
            </form>
            <span class="text-xs md:text-sm block mt-2 text-gray-400 text-center m:text-left">
              Eg. <router-link :to="{ path: '/search', query: { 'q': 'COVID-19' }}">COVID-19</router-link>
            </span>
            <h1 class="text-sm md:text-xl text-center">Or explore our resources by type</h1>
            <p class="text-center">
              <router-link class="btn-main m-auto" to="/search">Resource&nbsp;Types</router-link>
            </p>
          </div>
        </div>
        <div class="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-10 overflow-hidden opacity-50">
          <RotatingCards></RotatingCards>
        </div>
      </div>
    </div>
    <div>
      <!-- SECTIONS -->
      <div class="mx-auto">
          <!-- section -->
          <section class="flex  items-start min-h-[50vh] bg-main text-white flex-wrap md:flex-nowrap">
            <div class="w-full md:w-2/6 md:sticky top-10 py-10 px-20">
              <h2 class="text-2xl md:text-5xl font-bold ">
                What is the CD2H Resource Discovery Portal?
              </h2>
            </div>
            <div class="w-full md:w-4/6 leading-snug space-y-5 p-4 md:p-20 md:text-3xl text-md m-0">
              <div class="h-1/3 w-1/3 bg-gray-400 m-auto"></div>
              <p>The CD2H Resource Discovery Portal (RDP) is a single location to start your search for bioinformatics resources. <br>The platform draws from over 50 databases and covers over 20,000,000 total resources. You can accomplish a wide range of tasks with this single interface to search for many types of resources, including datasets, journal articles, Youtube videos, GitHub profiles, funding opportunities and more.</p>
              <p class="text-center">
                <router-link class="btn-main m-auto text-sm md:border-tertiary-light md:text-white" to="/about">Learn More</router-link>
              </p>
            </div>
          </section>
          <!-- section -->
          <section class="min-h-[50vh]">
            <div class="w-full top-10 py-10 px-20">
              <h2 class="text-2xl md:text-3xl font-bold text-main dark:text-secondary-light text-center">
                A central space to search for...
              </h2>
            </div>
            <div class="flex justify-center items-stretch flex-wrap w-full p-4 md:p-20">
                <SmallCard 
                title="Dataset"
                icon="fas fa-database" 
                :items="['A Nuclease DNA complex', 'Hair follicle and skin molecular signatures', 'Altering cancer transcriptomes using epigenomic inhibitors']"></SmallCard>
                <SmallCard 
                title="Person"
                icon="fas fa-user" 
                :items="['Michelle James', 'Cody Thompson', 'Joel Smith']"></SmallCard>
                <SmallCard 
                title="ComputationalTools"
                icon="fas fa-laptop" 
                :items="['Omics Integrator', 'Data Driven Ontology', 'ImmClassifier']"></SmallCard>
                <SmallCard 
                title="Instruments"
                icon="fas fa-microscope" 
                :items="['Hamilton Anxiety Scale (HAM-A)','Multidimensional Fatigue Inventory ', 'Self Care Of Heart Failure Index V 6.2']"></SmallCard>
                <SmallCard 
                title="Articles"
                icon="fas fa-book-open" 
                :items="['Human antiviral B cell responses: Emerging lessons from hepatitis B and COVID-19', 'Lung Ultrasound in Patients With Dyspnea From Infective Lung Disease']"></SmallCard>
                <SmallCard 
                title="ClinicalTrials"
                icon="fas fa-flask" 
                :items="['Pilot Evaluation of a New Galyfilcon A Lens Prototype and Enfilcon A Lens', 'A Phase I Clinical Study of a GamLPV, a Live Intranasal Bordetella Pertussis Vaccine']"></SmallCard>
                <SmallCard 
                title="Grants"
                icon="fas fa-scroll" 
                :items="['Omics Integrator', 'Data Driven Ontology', 'ImmClassifier']"></SmallCard>
                <SmallCard 
                title="Videos"
                icon="fab fa-youtube" 
                :items="['How a Drug Becomes a Drug', 'Curing a Child, Preserving a Childhood', 'Watch a moth drive a robot car']"></SmallCard>
                <SmallCard 
                title="Education"
                icon="fas fa-chalkboard" 
                :items="['An Overview of Survey Design','Developing and Writing Research Questions, Aims & Hypotheses','Managing Communication and Conflict']"></SmallCard>
                <div class="w-full p-10 text-center">
                  <router-link to="/search" class="btn-main !text-main font-bold">
                    Search By Resource
                  </router-link>
                </div>
              </div>
          </section>
          <!-- section -->
          <section class="flex items-start min-h-[50vh] bg-main text-white bg-no-repeat bg-right-bottom flex-wrap md:flex-nowrap" 
          style="background-image: url('/assets/img/bg_dark.svg')">
            <div class="w-full md:w-2/6 md:sticky top-10 py-10 px-20">
              <h2 class="text-2xl md:text-5xl font-bold">
                How is this platform being used?
              </h2>
            </div>
            <div class="w-full md:w-4/6 leading-snug space-y-5 p-4 text-md md:text-3xl md:p-20">
              <p class="font-serif italic text-center text-gray-200">“I want to stay up to date on PCR testing techniques” <i class="fas fa-comment"></i></p>
              <div class="flex items-stretch justify-center p-2 w-full md:w-2/3 flex-wrap">
                <div class="flex flex-row flex-wrap p-3 space-y-3 items-stretch">
                  <div class="flex justify-evenly items-center space-x-7 text-sm py-3 px-10 md:rounded-full bg-black/50 rounded-md flex-wrap">
                    <p>Discover researchers with relevant experience</p>
                    <p class="font-bold text-tertiary-light">Researcher- Maneesh Pingle, Assistant Professor of Microbiology and Immunology (Courtesy), Weill Cornell Medical College</p>
                  </div>
                  <div class="flex justify-evenly items-center space-x-7 text-sm py-3 px-10 md:rounded-full bg-black/50 flex-wrap rounded-md">
                    <p>Browse literature for new publications</p>
                    <p class="font-bold text-tertiary-light">Article - Comparison of Digital PCR and Quantitative PCR with Various SARS-CoV-2 Primer-Probe Sets.</p>
                  </div>
                  <div class="flex justify-evenly items-center space-x-7 text-sm py-3 px-10 md:rounded-full bg-black/50 flex-wrap rounded-md">
                    <p>Search for a protocol</p>
                    <p class="font-bold text-tertiary-light">Protocol - Detection of Sars-Cov2 Using Droplet Digital PCR</p>
                  </div>
                  <div class="flex justify-evenly items-center space-x-7 text-sm py-3 px-10 md:rounded-full bg-black/50 flex-wrap rounded-md">
                    <p>Find informative Youtube videos</p>
                    <p class="font-bold text-tertiary-light">Video - PCR Essentials</p>
                  </div>
                </div>
                <div class="p-3 text-center w-full md:w-1/3 flex items-center justify-center">
                  <router-link to="/search" class="btn-main font-bold text-sm md:border-tertiary-light md:text-white">
                    Try&nbsp;This&nbsp;Search
                  </router-link>
                </div>
              </div>
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
        <p class="text-xs">
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
    RotatingCards
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
      ]),
    },
}
</script>
