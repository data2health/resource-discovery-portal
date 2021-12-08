<template>
  <!-- navbar goes here -->
  <nav class="bg-main">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">

        <div class="flex space-x-4">
          <!-- logo -->
          <div>
            <router-link to="/" class="flex items-center py-5 px-2 text-indigo-200 hover:text-tertiary">
              <img src="../../assets/img/rdp.png" class="h-6 w-6 mr-2">
              <span class="font-bold">RDP</span>
            </router-link>
          </div>

          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link to="/" class="py-5 px-3 text-indigo-200 hover:text-tertiary-light">Home</router-link>
            <router-link to="/about" class="py-5 px-3 text-indigo-200 hover:text-tertiary-light">About</router-link>
          </div>
        </div>

        <!-- secondary nav -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link to="/" class="py-5 px-3">Login</router-link>
          <button @click="toggleDarkMode()" class="py-2 px-3 rounded-full bg-black dark:bg-white transition duration-500">
            <i class="fas" :class="[!darkMode ? 'fa-moon text-indigo-300' : 'fa-sun text-yellow-400']"></i>
          </button>
        </div>

        <!-- mobile button goes here -->
        <div class="md:hidden flex items-center">
          <button class="mobile-menu-button" @click="toggleMenu()">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- mobile menu -->
    <div class="mobile-menu md:hidden bg-indigo-600" :class="menuClass">
      <router-link to="/" @click="toggleMenu()" class="block py-2 px-4 text-sm hover:bg-secondary">Home</router-link>
      <router-link to="/about"  @click="toggleMenu()" class="block py-2 px-4 text-sm hover:bg-secondary">About</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Navigation',
    data: function(){
      return {
        showMenu: false,
        menuClass: ''
      }
    },
    components: {
    },
    methods:{
      toggleMenu() {
        this.showMenu = !this.showMenu;
        this.menuClass = this.showMenu ? '' : 'hidden';
      },
      toggleDarkMode() {
        this.$store.commit('toggleDarkMode');
      }
    },
    computed:{
      ...mapGetters([
        'darkMode'
      ]),
    },
    mounted:function(){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          // default is false, toggle if prefers dark
          this.$store.commit('toggleDarkMode');
      }
    }
}
</script>

<style>

</style>