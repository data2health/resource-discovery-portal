<template>
    <div class="w-64 m-2">
        <div class="text-lg font-normal">
            <div class="flex justify-center items-center p-1 z-20 w-full">
                <img data-aos="zoom-out-down" class="rounded-full dark:border-gray-700 border-8 w-24 m-auto border-gray-100"
                 :src="person.picture || '/assets/img/default.jpeg'" :alt="person.name">
            </div>
            <div class="dark:bg-gray-700 bg-gray-100 p-2 space-y-4 z-12 w-full rounded-2xl shadow-lg text-gray-500 dark:text-gray-200">
                <h1 class="text-center pt-4">{{person.name}}</h1>
                <div class="rounded-xl p-1 flex justify-center items-center flex-wrap">
                    <a v-if="person.social?.twitter" 
                    :href="person.social?.twitter" target="_blank" rel="nonreferrer" 
                    class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                        <i class="fab fa-twitter text-white"></i>
                    </a>
                    <a v-if="person.social?.linkedin" 
                    :href="person.social?.linkedin" target="_blank" rel="nonreferrer" 
                    class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                        <i class="fab fa-linkedin text-white"></i>
                    </a>
                    <a v-if="person.social?.github" 
                    :href="person.social?.github" target="_blank" rel="nonreferrer" 
                    class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                        <i class="fab fa-github-alt text-white"></i>
                    </a>
                    <a v-if="person.social?.website" 
                    :href="person.social?.website" target="_blank" rel="nonreferrer" 
                    class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary">
                        <i class="fas fa-home text-white"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonCard',
    props: {
        person: Object
    }
}
</script>