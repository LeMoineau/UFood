<template>
    <div class="transform">
        <div class="">
            <button type="button" id="show-modal" 
                @click="toggleModal" 
                class="text-lg select-none py-1 font-bold text-black md:max-xl:flex rounded-full bg-white w-9 text-center shadow-center-md">
                ...
            </button>
        </div>
        <Transition name="fade">
            <div v-show="showModal">
                <div class="absolute mt-2 right-0 bg-white p-4 rounded-md shadow-center-md z-50 whitespace-nowrap">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    data(){
        return {
            showModal: false,
        }
    },
    methods: {
        closeModal: function() {
            this.showModal = false
        },
        openModal: function() {
            this.showModal = true
        },
        toggleModal: function() {
            this.showModal = !this.showModal
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