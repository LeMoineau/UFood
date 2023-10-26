<template>
    <center-modal :show="show" @close="closeModal">
        <div class="flex flex-col justify-start">
            <!-- Modal title -->
            <h1 class="font-semibold text-xl mb-4"> Adding the restaurant to a list </h1>

            <!-- Message d'erreur not connected -->
            <div v-if="!currentUserStore.connected" class="flex flex-col">
                <p> You need to be connected to adding a restaurant to a favorites list </p>
                <cubic-button 
                    @click="closeModal"
                    bgColor="bg-gray-100" 
                    textColor="text-black" 
                    class="w-min mt-4 self-end text-lg px-6 py-2"> Ok </cubic-button>
            </div>

            <!-- Listes des listes de favories -->
            <div v-else class="flex flex-col">
                <!-- Message d'erreur no favorites lists -->
                <div v-if="favoritesLists.length <= 0" class="flex flex-col">
                    <p> You have no favorites lists, create one and add the restaurant to it ! </p>
                    <router-link :to="{name: 'User', params: {toFavorites: true}}" class="self-center text-blue-500 mt-4 mb-2"> To your profil page</router-link>
                </div>

                <!-- Listes des listes de favories -->
                <div v-else>
                    <p class="text-xs mb-1"> choose a list where to add the restaurant </p>
                    <div class="flex flex-col max-h-1/2-screen overflow-auto p-3">
                        <div v-for="favorite in favoritesLists" :key="favorite.id" 
                                @click="async () => await addRestaurantToFavoritesList(favorite.id)"
                                class="w-full mb-3 p-3 cursor-pointer rounded-lg shadow-md">
                            {{ favorite.name }}
                        </div>
                    </div>
                    <p class="text-red-300 self-center"> {{ errorMessage }} </p>
                </div>

                <!-- Bouton de validation -->
                <cubic-button 
                    @click="closeModal"
                    bgColor="bg-gray-100" 
                    textColor="text-black" 
                    class="w-min mt-4 self-end text-lg px-6 py-2"> Cancel </cubic-button>
            </div>
        </div>
    </center-modal>
</template>

<script>
import CenterModal from '../CenterModal.vue';
import CubicButton from '../CubicButton.vue';

import { currentUserStore } from '../../../stores/currentUserStore';
import { getFavoritesList, postAddRestaurantToFavoritesList } from '../../../api/api-favorites';
import { getUserFavoritesLists } from '../../../api/api-user';

export default {
    props: {
        show: Boolean,
        restaurant: Object
    },
    components: {
        "center-modal": CenterModal,
        "cubic-button": CubicButton
    },
    data() {
        return {
            favoritesLists: [],
            errorMessage: "",
            currentUserStore
        }
    },
    methods: {
        addRestaurantToFavoritesList: async function(favoriteId) {
            let favoritesList = await getFavoritesList(favoriteId)
            if (favoritesList.restaurants.find(r => r.id === this.restaurant.id)) {
                this.errorMessage = "This restaurant is already in the list"
                return
            }
            await postAddRestaurantToFavoritesList(favoriteId, this.restaurant.id)
            console.log(`restaurant #${this.restaurant.id} added to favorites list #${favoriteId}!`)
            this.closeModal()
        },
        closeModal: function() {
            this.$emit('close')
        }
    },
    watch: {
        async show() {
            if (currentUserStore.connected) {
                this.favoritesLists = (await getUserFavoritesLists(currentUserStore.id)).items
            }
        }
    }
}
</script>