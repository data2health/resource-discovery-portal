<template>
  <!-- hero -->
  <div class="h-screen m-auto dm flex justify-center items-center">
    <div class="h-2/3">
      <div class="bg-grey-100 p-5 text-center max-w-screen-md m-auto mb-10">
        <img v-if="!darkMode" src="../../assets/img/rdp_color.svg" class="m-auto w-1/3">
        <img v-else src="../../assets/img/rdp_dark.svg" class="m-auto w-1/3">
      </div>
      <!-- search -->
      <div class="w-auto m-auto px-5">
          <form @submit.prevent="search()" class="w-full flex items-center">
            <input 
            v-model="query"
            type="text" 
            placeholder="search" 
            class="w-full m-auto py-2 px-4 text-2x text-main
            rounded-full border-secondary border-2 focus:outline-none focus:ring-2 
            focus:ring-secondary-light focus:border-transparent dark:bg-gray-300">
            <button type="submit" class="btn-main ml-2">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <span class="text-sm block mt-2 text-gray-400">
            Eg. <router-link :to="{ path: '/search', query: { 'q': 'COVID-19' }}">COVID-19</router-link>
          </span>
        </div>
      <Resources></Resources>
    </div>
    <!-- cookie consent -->
    <Modal v-if="cookiesWarning">
      <template v-slot:title>
        <h2 class="text-tertiary"><i class="fas fa-cookie-bite text-orange-300"></i> RDP Analytics &amp; Cookies</h2>
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
import Resources from '../components/Resources.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      query:'',
      cookiesWarning: false
    }
  },
  components: {
    Resources
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
