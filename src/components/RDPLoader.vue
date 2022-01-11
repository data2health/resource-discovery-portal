<template>
    <div class="loader-container">
        <div class="relative w-48 h-auto">
            <h1 class="absolute font-bold text-main dark:text-white left-20 z-40 text-xl">LOADING</h1>
            <div class="absolute h-4 w-8 bg-main rounded shadow-xl loader-card-1 z-10"></div>
            <div class="absolute h-4 w-8 bg-main-light rounded shadow-xl -mt-2 loader-card-1-b z-20"></div>
            <div class="absolute h-4 w-8 bg-amber-300 rounded shadow-xl mt-2 loader-card-4 z-30"></div>
            <div class="absolute h-6 w-10 bg-tertiary rounded shadow-xl mt-4 loader-card-2 z-40"></div>
            <div class="absolute h-5 w-9 bg-green-400/50 rounded shadow-xl -mt-4 loader-card-2-b z-50"></div>
            <div class="absolute h-3 w-7 bg-pink-500 rounded shadow-xl mt-8 loader-card-3 z-20"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RDPLoader'
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

    .loader-card-1{
        animation: sliding 1s infinite linear;
    }
    .loader-card-1-b{
        animation: sliding .85s infinite linear;
    }
    .loader-card-2{
        animation: sliding .75s infinite linear;
    }
    .loader-card-2-b{
        animation: sliding .95s infinite linear;
    }
    .loader-card-3{
        animation: sliding 1.5s infinite linear;
    }
    .loader-card-4{
        animation: sliding 2s infinite linear;
    }

    @keyframes sliding/* Safari and Chrome */ {
        0%{
            transform: translateX(5px);
            -webkit-transform:translateX(5px);
            opacity: 0;
        }
        10%{
            /* transform: translateX(0px);
            -webkit-transform:translateX(0px); */
            opacity: .8;
        }
        80%{
            /* transform: translateX(0px);
            -webkit-transform:translateX(0px); */
            opacity: .8;
        }

        100%{
            transform: translateX(200px);
            -webkit-transform:translateX(200px);
            opacity: 0;
        }
    }
</style>