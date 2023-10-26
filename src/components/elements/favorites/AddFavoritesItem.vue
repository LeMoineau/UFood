<template>
    <div @click="showCreateFavoritesListModal = true"
            class="flex flex-col justify-center cursor-pointer items-center w-64 h-80 bg-gray-100 rounded-2xl shadow-center-md m-4">
        <p class="text-6xl font-medium"> + </p>
        <p class="text-center"> Create new favorite list </p>

        <center-modal :show="showCreateFavoritesListModal" @close="closeCreateFavoritesListModal()">
            <div class="flex flex-col justify-start">
                <h1 class="font-semibold text-xl mb-4"> Create new favorites list </h1>
                <p class="text-xs mb-1"> Favorites list name </p>
                <input maxlength="30" type="text" placeholder="Your list name" class="shadow-center-md w-full h-12 rounded-md mb-6 px-4" v-model="createdFavoritesListName">
                <p class="text-red-300 self-center"> {{ errorMessage }} </p>
                <cubic-button bgColor="bg-green-400 w-min mt-4 self-end text-lg px-6 py-2" @click="createNewFavoritesList"> Confirm </cubic-button>
            </div>
        </center-modal>
    </div>
</template>

<script>
import CenterModal from './../CenterModal.vue';
import CubicButton from './../CubicButton.vue';

import { postNewFavoritesList } from '../../../api/api-favorites';
import { currentUserStore } from '../../../stores/currentUserStore';

export default {
    components: {
        "center-modal": CenterModal,
        "cubic-button": CubicButton
    },
    emits: ["newFavoritesListCreate"],
    data() {
        return {
            showCreateFavoritesListModal: false,
            createdFavoritesListName: "",
            errorMessage: "",
            currentUserStore
        }
    },
    methods: {
        async createNewFavoritesList() {
            if (this.createdFavoritesListName.length <= 0) {
                this.errorMessage = "You need to enter a name for the new favorites list"
            } else if (this.createdFavoritesListName.length > 30) {
                this.errorMessage = "The name of your favorites list must be less than 30 characters"
            } else {
                let favoritesList = await postNewFavoritesList(currentUserStore.user.email, this.createdFavoritesListName) 
                console.log("favorites list created!")
                this.createdFavoritesListName = ""
                this.closeCreateFavoritesListModal()
                this.$emit('newFavoritesListCreate', favoritesList)
            }
        },
        closeCreateFavoritesListModal() {
            this.showCreateFavoritesListModal = false
            this.createdFavoritesListName = ""
        }
    }
}
</script>