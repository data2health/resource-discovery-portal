<template>
    <div class="bg-gray-100 dark:bg-gray-700 p-2">
        <div class="flex justify-center items-center flex-col space-y-2">
            <template v-if="isUrl">
                <template v-if="img">
                    <img :src="img" :alt="type" width="80">
                    <h2 class="text-2xl font-bold">{{title}}</h2>
                </template>
                <a class="font-bold text-xl" :href="url" target="_blanl" rel="nonreferrer">
                    View License Details <i class="fas fa-external-link-square-alt"></i>
                </a>
            </template>
            <p v-else><b>License:</b> {{url}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "License",
    data: function () {
        return {
            type: 'null',
            img: '',
            title: '',
            isUrl: false
        } 
    },
    props: ['url'],
    mounted: function(){
        // console.log(this.url)
        if (this.url.includes('http')) {
            this.isUrl = true;
            if (this.url.includes('by/4.0/')) {
                this.type = 'Attribution'
                this.title = 'Attribution 4.0 International (CC BY 4.0)'
                this.img = '/assets/img/by.png'
            } 
            else if (this.url.includes('by-sa/4.0/')) {
                this.type = 'Attribution-ShareAlike'
                this.title = 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)'
                this.img = '/assets/img/by-sa.png'
            } 
            else if (this.url.includes('by-nd/4.0/')) {
                this.type = 'Attribution-NoDerivs'
                this.title = 'Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)'
                this.img = '/assets/img/by-nd.png'
            } 
            else if (this.url.includes('by-nc/4.0/')) {
                this.type = 'Attribution-NonCommercial'
                this.title = 'Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)'
                this.img = '/assets/img/by-nc.png'
            } 
            else if (this.url.includes('by-nc-sa/4.0/')) {
                this.type = 'Attribution-NonCommercial-ShareAlike'
                this.title = 'Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)'
                this.img = '/assets/img/by-nc-sa.png'
            } 
            else if (this.url.includes('by-nc-nd/4.0/')) {
                this.type = 'Attribution-NonCommercial-NoDerivs'
                this.title = 'Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)'
                this.img = '/assets/img/by-nc-nd.png'
            }
            else if (this.url.includes('zero/1.0/')) {
                this.type = 'Public Domain'
                this.title = 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication'
                this.img = '/assets/img/by-p.png'
            }
            else {
                this.type = 'default'
                this.title = ''
                this.img = ''
            }
        }else{
            this.isUrl= false;
            this.title = this.url
        }
    }
}
</script>