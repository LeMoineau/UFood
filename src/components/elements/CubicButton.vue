<template>
    <div :class="`${bgColor} ${textColor}`" class="shadow px-3 py-1 rounded-md m-0 text-center cursor-pointer">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            bgColor: {
                type: String,
                required: false,
                default: "bg-blue-200"
            },
            textColor: {
                type: String,
                required: false,
                default: "text-white"
            }
        }
    }
</script>