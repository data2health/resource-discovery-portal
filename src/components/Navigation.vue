<template>
  <!-- navbar goes here -->
  <nav class="bg-gray-100 dark:bg-gray-600">
    <div class="max-w-6xl mx-auto px-2">
      <div class="flex justify-between">

        <div class="flex w-full justify-between">
          <!-- logo -->
          <div class="flex-grow">
            <router-link to="/" class="flex items-center py-1 px-2 text-main hover:text-main-light">
              <img v-if="darkMode" src="/assets/img/rdp_text.svg" class="md:w-24 w-16 py-3">
              <img v-else src="/assets/img/rdp_text_color.svg" class="md:w-24 w-16 py-3">
            </router-link>
          </div>

          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-3 mr-5">
            <router-link to="/search" class="py-3 px-3 text-main hover:text-main-light dark:text-gray-200 dark:hover:text-gray-100">Keyword Search</router-link>
            <router-link :to="{name:'Resources'}" class="py-3 px-3 text-main hover:text-main-light dark:text-gray-200 dark:hover:text-gray-100">Resource Types</router-link>
            <router-link to="/about" class="py-3 px-3 text-main hover:text-main-light dark:text-gray-200 dark:hover:text-gray-100">About</router-link>
          </div>
        </div>

        <!-- secondary nav -->
        <div class="hidden md:flex items-center space-x-1">
          <Popper :content="darkMode ? 'Light Mode' : 'Dark Mode'" class="tip" :hover="true" placement="bottom">
            <button @click="toggleDarkMode()" 
            :class="[darkMode ? 'darkMode-btn-light' : 'darkMode-btn-dark']"
            class="py-2 px-3 icon-btn bg-black dark:bg-white transition-all duration-300">
              <i class="fas transition-all duration-300" :class="[!darkMode ? 'fa-moon text-indigo-300' : 'fa-sun text-yellow-400']"></i>
            </button>
          </Popper>
        </div>

        <!-- mobile button goes here -->
        <div class="md:hidden flex items-center mr-5">
          <button class="mobile-menu-button" @click="toggleMenu()">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" color="indigo" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- mobile menu -->
    <div class="mobile-menu md:hidden bg-main-dark" :class="menuClass">
      <router-link to="/search"  @click="toggleMenu()" class="block py-2 px-4  hover:bg-secondary">Keyword Search</router-link>
      <router-link :to="{name:'Resources'}"  @click="toggleMenu()" class="block py-2 px-4  hover:bg-secondary">Resource Types</router-link>
      <router-link to="/about"  @click="toggleMenu()" class="block py-2 px-4  hover:bg-secondary">About</router-link>
      <a href="#" @click="toggleDarkMode()" class="block py-2 px-4  hover:bg-secondary">
        <i class="fas" :class="[!darkMode ? 'fa-moon text-indigo-300' : 'fa-sun text-yellow-400']"></i> Toggle Mode
      </a>
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
        menuClass: 'hidden'
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