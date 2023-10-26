<template>
    <div class="flex flex-row w-full justify-start items-center self-start mt-4">
        <div v-for="(p, index) in path" :key="index" class="flex flex-row items-center">
            <a @click="$emit('clickPath', p)" class="text-lg cursor-pointer"> {{ p }} </a>
            <p v-if="index < path.length - 1 || showLastSlash" class="mx-1"> / </p>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        path: Array,
        showLastSlash: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    emits: ['clickPath']
}
</script>