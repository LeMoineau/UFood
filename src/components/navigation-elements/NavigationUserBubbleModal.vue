
<template>
    <Transition name="fade">
        <div v-show="show" @click.self="close" class="fixed w-screen h-screen top-0 left-0 z-50">
            <slot></slot>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        show: Boolean
    },
    emits: ["close"],
    methods: {
        close: function() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>