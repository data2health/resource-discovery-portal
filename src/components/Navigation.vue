<template>
  <!-- navbar goes here -->
  <nav class="bg-main">
    <div class="max-w-6xl mx-auto px-2">
      <div class="flex justify-between">

        <div class="flex space-x-4">
          <!-- logo -->
          <div>
            <router-link to="/" class="flex items-center py-1 px-2 text-indigo-200 hover:text-tertiary">
              <img src="../../assets/img/rdp_text.svg" class="h-24 w-24 mr-2">
              <span class="font-bold">Resource Discovery Portal</span>
            </router-link>
          </div>

          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link to="/about" class="py-5 px-3 text-indigo-200 hover:text-tertiary-light">About</router-link>
            <router-link to="/search" class="py-5 px-3 text-indigo-200 hover:text-tertiary-light">Search</router-link>
          </div>
        </div>

        <!-- secondary nav -->
        <div class="hidden md:flex items-center space-x-1">
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
      <router-link to="/about"  @click="toggleMenu()" class="block py-2 px-4 text-sm hover:bg-secondary">About</router-link>
      <router-link to="/search"  @click="toggleMenu()" class="block py-2 px-4 text-sm hover:bg-secondary">Search</router-link>
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