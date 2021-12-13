<template>
  <div :class="[darkMode ? 'dark' : '']">
    <Navigation></Navigation>
    <Loader v-if="loading"></Loader>
    <div id="modals-go-here"></div>
    <router-view v-slot="{ Component }" :key="$route.href">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Footer from './components/Footer.vue'
  import Navigation from './components/Navigation.vue'
  import Loader from './components/Loader.vue'

  export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Loader
  },
  computed:{
    ...mapGetters([
      'darkMode',
      'loading'
    ]),
  },
  mounted: function(){
    //recent search history
    this.$store.commit('checkRecentSearches');
  }
}
</script>