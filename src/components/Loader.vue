<template>
  <div class="loader-container">
      <div class="ring-container">
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
            <div class="loader-text text-tertiary dark:text-light">Loading</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>

<style>
    .loader-container{
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        /* background: yellow; */
        position: absolute;
        top: 0;
        left: 0;
    }
    .ring-container{
        position: sticky;
    }
    .loader-ring{
        position: absolute;
        border-radius: 100%;
        /* border: 2px solid transparent; */
    }

    .loader-ring:nth-child(1){
        border-left: #2cceff 2px solid;
        margin-top: 5px;
        box-shadow: rgb(52, 56, 255) -3px -2px 15px;
        width: 60px;
        height: 60px;
        -webkit-animation: rotating 1.5s linear infinite;
        -moz-animation: rotating 1.5s linear infinite;
        -ms-animation: rotating 1.5s linear infinite;
        -o-animation: rotating 1.5s linear infinite;
        animation: rotating 1.5s linear infinite;
    }
    .loader-ring:nth-child(2){
        border-top: #866AC8 2px solid;
        margin-left: 2px;
        box-shadow: #00ccf5 2px 2px 20px;
        width: 70px;
        height: 70px;
        -webkit-animation: rotating 1s linear infinite;
        -moz-animation: rotating 1s linear infinite;
        -ms-animation: rotating 1s linear infinite;
        -o-animation: rotating 1s linear infinite;
        animation: rotating 1s linear infinite;
    }
    .loader-ring:nth-child(3){
        border-right: #4A3FCA 2px solid;
        margin-bottom: 5px;
        box-shadow: turquoise 0px 0px 10px;
        width: 65px;
        height: 65px;
        -webkit-animation: rotating 2s linear infinite;
        -moz-animation: rotating 2s linear infinite;
        -ms-animation: rotating 2s linear infinite;
        -o-animation: rotating 2s linear infinite;
        animation: rotating 2s linear infinite;
    }
    .loader-text{
        width: 45px;
        height: 45px;
        margin-top: 20px;
        margin-left: 5px;
    }

    @-webkit-keyframes rotating /* Safari and Chrome */ {
        from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes rotating {
        from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>