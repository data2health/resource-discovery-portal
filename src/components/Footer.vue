<template>
  <div class="w-screen bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
    <div class="max-w-screen-md m-auto py-8 px-2">
      <div class="grid grid-cols-2 gap-5 my-5">
        <div>
          <ul class="text-sm">
            <li>
              <router-link to="/" class="py-5 px-3 ">Home</router-link>
            </li>
            <li>
              <router-link to="/about" class="py-5 px-3">About</router-link>
            </li>
          </ul>
        </div>
        <div>
          <small>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quidem, repudiandae quam, elige.</small>
        </div>
    </div>
    <div>
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