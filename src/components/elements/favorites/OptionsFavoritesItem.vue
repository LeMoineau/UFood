<template>
    <div class="w-full lg:w-80 min-h-120px h-auto lg:h-96 rounded-md flex flex-row lg:flex-col justify-start items-center mt-6 lg:mx-4 transform">
        <router-link to="/" class="rounded-lg mr-2 lg:mx-0 lg:mb-2 bg-gray-200 h-32 lg:h-1/2 w-1/2 lg:w-full shadow-center-md flex flex-col justify-center items-center">
            <p class="text-6xl font-medium"> + </p>
            <p class="text-center"> Add a restaurant to the list </p>
        </router-link>
        <div @click="deleteCurrentFavoritesList" class="rounded-lg cursor-pointer ml-2 lg:mx-0 lg:mt-2 bg-red-200 h-32 lg:h-1/2 w-1/2 lg:w-full shadow-center-md flex flex-col justify-center items-center">
            <img src="../../../assets/trash.png" alt="delete favorites list" class="w-10" />
            <p class="mt-2 text-center"> Delete <b> {{ favorite.name }} </b> </p>
        </div>
    </div>
</template>

<script>
import { deleteFavoritesList } from '../../../api/api-favorites'
export default {
    props: {
        favorite: Object
    },
    emits: ["deleteFavoritesList"],
    methods: {
        deleteCurrentFavoritesList: async function() {
            await deleteFavoritesList(this.favorite.id)
            console.log(`favorites list ${this.favorite.name} deleted!`)
            this.$emit('deleteFavoritesList', this.favorite)
        }
    }
}
</script>