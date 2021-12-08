<template>
  <div :class="[darkMode ? 'dark' : '']">
    <Navigation></Navigation>
    <div id="modals-go-here"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './components/Footer.vue'
  import Navigation from './components/Navigation.vue'
  import { mapGetters } from 'vuex'

  export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  computed:{
    ...mapGetters([
      'darkMode'
    ]),
  }
}
</script>