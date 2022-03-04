<template>
    <details :open="expanded">
        <summary :class="color">
            <h1 class="inline font-light text-2xl cursor-pointer"><slot name="title"></slot></h1>
        </summary>
        <div class="space-y-1">
            <slot name="value"></slot>
        </div>
    </details>
</template>

<script>
export default {
    name: "ExpandableSection",
    props: {
        color: {
            type: String,
            default: 'text-blue-500'
        },
        expanded:{
            type: Boolean,
            default: false
        }
    }
}
</script>