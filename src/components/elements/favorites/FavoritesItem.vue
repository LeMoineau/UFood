<template>
    <div class="flex flex-col cursor-pointer justify-center items-center transform w-64 h-80 bg-blue-400 rounded-2xl shadow-center-md m-4 overflow-hidden">
        <div @click="clickFavorite" class="w-full h-full">
            <div class="absolute flex flex-col justify-start items-start bottom-4 left-0 px-4">
                <p class="text-white text-3xl font-semibold mb-3"> {{ favorite.name }} </p>
                <p class="bg-white rounded-full px-3 py-1 text-xs shadow-center-md w-fit"> {{ favorite.restaurants.length }} Restaurants </p>
            </div>
            <div class="w-full h-full"> </div>
        </div>
        <dot-button class="absolute top-4 right-4">
            <slot></slot>
        </dot-button>
    </div>
</template>

<script>
import DotButton from './../DotButton.vue';

export default {
    props: {
        favorite: Object
    },
    components: {
        "dot-button": DotButton
    },
    emits: ["clickFavorite"],
    methods: {
        clickFavorite: function() {
            this.$emit('clickFavorite')
        }
    }
}
</script>