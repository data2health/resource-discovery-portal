<template>
    <div class="relative rounded-md hover:bg-gray-300/25 p-1 cursor-pointer text-sm dark:text-gray-300" 
    v-if="text && text.length > 200" 
    @click.prevent="expanded = !expanded">
        <p v-html="!expanded ? text.substring(0, 200) + '...' : text"></p>
    </div>
    <p class="text-gray-400 text-sm" v-else-if="!text">
        No Description Available
    </p>
    <template v-else>
        <p class="text-sm dark:text-gray-300" v-html="text"></p>
    </template>
</template>

<script>
export default {
    name: 'ExpandableDescription',
    data: function () {
        return {
            expanded: false
        }
    },
    props: {
        text: String
    }
}
</script>