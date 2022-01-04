<template>
    <div class="flex flex-nowrap m-1 text-xs">
        <div class="rounded-l-lg px-2 py-1 items-center flex font-semibold text-gray-100" :class="color">
            <slot name="title"></slot>
        </div>
        <div class="bg-gray-200 dark:bg-gray-500 rounded-r-lg px-2 py-1 items-center flex">
            <slot name="value"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pill",
    props: ['color']
}
</script>