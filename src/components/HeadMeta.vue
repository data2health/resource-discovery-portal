<template>
  <teleport to="head">
    <link rel="icon" href="/favicon.ico"/>
    <link rel="apple-touch-icon" :href="apple"/>
    <meta name="twitter:image" :content="featured"/>
    <link rel="shortcut icon" type="image/png" :href="apple"/>
    <link rel="shortcut icon" type="image/png" :href="apple"/>
    <link rel="apple-touch-icon" :href="apple"/>
    <link rel="apple-touch-icon" sizes="57x57" :href="apple"/>
    <link rel="apple-touch-icon" sizes="72x72" :href="apple"/>
    <link rel="apple-touch-icon" sizes="76x76" :href="apple"/>
    <link rel="apple-touch-icon" sizes="114x114" :href="apple"/>
    <link rel="apple-touch-icon" sizes="120x120" :href="apple"/>
    <link rel="apple-touch-icon" sizes="144x144" :href="apple" >
    <link rel="apple-touch-icon" sizes="152x152" :href="apple"/>
    <link rel="apple-touch-icon" sizes="180x180" :href="apple"/>
    <link rel="mask-icon" :href="safari" color="#4a3fc9">
  </teleport>
</template>

<script>
import apple from '../../public/assets/img/apple-touch-icon.png'
import safari from '../../public/assets/img/safari-pinned-tab.svg'
import featured from '../../public/assets/img/rdp_featured.jpg'

export default {
    name: 'HeadMeta',
    data: function() {
        return{
            apple: apple,
            featured: featured,
            safari: safari
        }
    }
}
</script>