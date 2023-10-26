<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-show="show" 
                    @click.self="close" 
                    :style="{'background-color': grayMask ? 'rgba(0, 0, 0, 0.2)' : '', '': customStyle}"
                    class="fixed w-screen h-screen top-0 left-0 z-50">
                <div :class="customClass ? customClass : 'fixed top-1/2 left-1/2 w-96 min-h-120px transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 shadow-center-md'" 
                        :style="customStyle">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script>
export default {
    props: {
        show: Boolean,
        grayMask: {
            type: Boolean,
            required: false,
            default: false
        },
        customClass: String,
        customStyle: String
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