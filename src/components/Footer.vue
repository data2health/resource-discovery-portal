<template>
  <div class="w-screen bg-gray-800 dark:bg-gray-700 dark:text-gray-200 text-gray-400">
    <div class="max-w-screen-xl m-auto py-8 px-2">
      <div class="grid grid-cols-2 gap-5 my-5">
        <div class="flex justify-center">
          <ul class="text-sm">
            <li class="mb-5">
              <router-link to="/" >Home</router-link>
            </li>
            <li class="mb-5">
              <router-link  :to="{name:'Search'}">Search</router-link>
            </li>
            <li class="mb-5">
              <router-link  :to="{name:'Resources'}">Resources</router-link>
            </li>
            <li class="mb-5">
              <router-link to="/about">About</router-link>
            </li>
            <li class="mb-5">
              <router-link to="/privacy">Privacy</router-link>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <p class="text-sm">
            <a href="#" class="mr-3" rel="nonreferrer" target="_blank"><i class="fab fa-twitter fa-2x text-main-light"></i></a>
            <a href="mailto:cd2h@ohsu.edu" class="mr-3" rel="nonreferrer" target="_blank"><i class="fas fa-envelope fa-2x text-main-light"></i></a>
            <a href="#" class="mr-3" rel="nonreferrer" target="_blank"><i class="fab fa-github fa-2x text-main-light"></i></a>
          </p>
        </div>
    </div>
    <div class="flex justify-center items-center flex-wrap w-full">
          <img src="/assets/img/rdp_white.svg" class="h-10 m-5">
          <img src="/assets/img/cd2h_white.png" class="h-10 m-5">
          <img src="/assets/img/scripps_white.png" class="h-10 m-5">
          <img src="/assets/img/iowa.png" class="h-20 m-5">
          <img src="/assets/img/sage_white.svg" class="h-10 m-5">
    </div>
    <div>
      <p class="text-xs text-center">
        The CTSA Program National Center for Data to Health (CD2H) is supported by the National Center for Advancing Translational Sciences (NCATS) at the National Institutes of Health (Grant U24TR002306).
      </p>
      <p class="text-center text-sm">Copyright &copy; <span id="year"></span>.
          <a target="_blank" class="blue-grey-text" href="http://search.cd2h.org">RDP</a>.
      </p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    data: function(){
      return {
      }
    },
    mounted: ()=>{
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      var myelement = document.getElementById("year");
      myelement.innerHTML= year;
    }
}
</script>

<style>

</style>