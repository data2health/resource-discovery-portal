<template>
    <div class="flex justify-center items-center min-h-[80vh] w-full darkMode px-5">
        <div>
            <h1 class="text-9xl font-bold text-center">404</h1>
            <h1 class=" font-light text-center italic font-serif text-secondary-light dark:text-accent">"You are here...but you should be over here"</h1>
            <img v-if="!darkMode" src="/assets/img/404.svg" alt="logo" class="m-auto w-1/2">
            <img v-else src="/assets/img/404-dark.svg" alt="logo" class="m-auto w-1/2">
            <p class="text-center">
                <router-link to="/">Let's start again...</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: '404',
    computed:{
        ...mapGetters([
            'darkMode',
        ]),
    },
}
</script>
