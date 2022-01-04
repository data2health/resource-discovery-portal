<template>
    <div class="relative rounded-md hover:bg-gray-300/25 p-1 cursor-pointer" 
    v-if="text && text.length > 200" 
    @click.prevent="expanded = !expanded">
        <p>
            {{!expanded ? text.substring(0, 200) + '...' : text}}
        </p>
    </div>
    <p v-else>
        {{text || 'No Description Available'}}
    </p>
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