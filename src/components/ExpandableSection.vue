<template>
    <details :open="expanded">
        <summary :class="color">
            <span class="inline cursor-pointer"><slot name="title"></slot></span>
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