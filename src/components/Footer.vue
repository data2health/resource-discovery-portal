<template>
  <div class="w-screen bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-600">
    <div class="max-w-screen-md m-auto py-8 px-2">
      <div class="grid grid-cols-2 gap-5 my-5">
        <div>
          <ul class="text-sm">
            <li class="mb-5">
              <router-link to="/" >Home</router-link>
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
          <img src="../../assets/img/rdp_white.svg" class="w-1/4 mb-5 m-auto">
          <img src="../../assets/img/cd2h_white.png" class="w-1/2 mb-5 m-auto">
          <p class="text-sm">
            <a href="#" class="mr-3" rel="nonreferrer" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
            <a href="mailto:cd2h@ohsu.edu" class="mr-3" rel="nonreferrer" target="_blank"><i class="fas fa-envelope fa-2x"></i></a>
            <a href="#" class="mr-3" rel="nonreferrer" target="_blank"><i class="fab fa-github fa-2x"></i></a>
          </p>
        </div>
    </div>
    <div>
      <p class="text-xs text-center">
        The CTSA Program National Center for Data to Health (CD2H) is supported by the National Center for Advancing Translational Sciences (NCATS) at the National Institutes of Health (Grant U24TR002306).
      </p>
      <p class="text-center text-sm">Copyright &copy; <span id="year"></span>.
          <a target="_blank" class="blue-grey-text" href="http://smart-api.info">RDP</a>.
          All content available via <a target="_blank" rel="license" href="http://creativecommons.org/licenses/by/4.0/">&nbsp;...
          </a>
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