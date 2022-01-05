<template>
<Popper content="Facebook" class="tip" :hover="true" placement="top">
    <a class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary" 
    :href="'https://facebook.com/sharer/sharer.php?u='" 
    target="_blank" rel="noopener" aria-label="Facebook">
        <i class="fab fa-facebook text-white"></i>
    </a>
</Popper>
<Popper content="Twitter" class="tip" :hover="true" placement="top">
    <a class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary" 
    :href="'https://twitter.com/intent/tweet/?text='" 
    target="_blank" rel="noopener" aria-label="Twitter">
        <i class="fab fa-twitter text-white"></i>
    </a>
</Popper>
<Popper content="E-mail" class="tip" :hover="true" placement="top">
    <a class="icon-btn rounded-xl bg-main hover:bg-main-light dark:bg-secondary-light dark:hover:bg-secondary" 
    :href="'mailto:?subject=Resource%20Discovery%20Portal&amp;body='" 
    target="_self" rel="noopener" aria-label="E-Mail">
        <i class="fas fa-envelope text-white"></i>
    </a>
</Popper>
</template>

<script>
export default {
    name: "ShareButtons"
} 
</script>