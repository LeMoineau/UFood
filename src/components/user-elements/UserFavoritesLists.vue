<template>
    <div class="w-full">
        <!-- Loading visited restaurants -->
        <div v-if="loading" class="flex flex-col items-center w-full mt-20">
            <p> Loading your favorites lists... </p>
            <img src="../../assets/loading_circle.gif" alt="loading circle gif" class="w-10" />
        </div>

        <!-- Lists of favorites -->
        <div v-if="!aFavoritesListOpen" class="flex flex-col justify-center md:justify-start mx-4 md:mx-40 flex-wrap">
            <path-displayer :path="['My favorites']"></path-displayer>
            <div class="flex flex-row flex-wrap justify-start items-center">
                <favorites-item 
                        v-for="(favorite, index) in favorites" 
                        :key="index" 
                        :favorite="favorite" 
                        @clickFavorite="() => openFavoritesList(favorite)">
                    <favorite-item-dot-button-modal :favorite="favorite"
                        @openFavoritesList="(f) => openFavoritesList(f)" @deleteFavoritesList="f => deleteFavoritesList(f)"></favorite-item-dot-button-modal>
                </favorites-item>
                <add-favorites-item @newFavoritesListCreate="res => newFavoritesListCreate(res)"></add-favorites-item>
            </div>
        </div>

        <!-- An opened favorites list -->
        <div v-else class="flex flex-col justify-center md:justify-start mx-4 md:mx-40 flex-wrap pb-20">
            <path-displayer :path="['My favorites']" @clickPath="p => {if (p === 'My favorites') closeFavoritesListOpen()}">
                <div v-show="!showModifyNameField" @click="displayModifyNameField" class="flex flex-row items-center cursor-pointer">
                    <p class="font-semibold text-xl"> {{ currentFavoritesListOpen.name }} </p>
                    <img src="../../assets/pen.png" alt="modify favorites list name" class="w-4 h-4 ml-1"/>
                </div>
                <div v-show="showModifyNameField">
                    <input v-model="modifyingName" 
                        v-on:focusout="hideModifyNameField" 
                        v-on:keyup.enter="submitNewFavoritesListName"
                        ref="modifyNameFieldInput" 
                        type="text" class="w-full rounded-sm z-10 border-black border-solid border ml-1 z-10">
                </div>
            </path-displayer>
            <div class="flex flex-col lg:flex-row justify-start items-center flex-wrap">
                <restaurant-item v-for="r in currentFavoritesListOpen.restaurants" :key="r.id" :restaurant="r">
                    <favorite-restaurant-dot-button-modal :restaurant="r" :favorite="currentFavoritesListOpen"
                        @removeRestaurantFromTheList="r => removeRestaurantFromTheList(currentFavoritesListOpen, r)"></favorite-restaurant-dot-button-modal>
                </restaurant-item>
                <options-favorites-item :favorite="currentFavoritesListOpen" @deleteFavoritesList="f => deleteFavoritesList(f)"></options-favorites-item>
            </div>
        </div>
    </div>
</template>

<script>
import RestaurantItem from '../elements/RestaurantItem.vue';
import PathDisplayer from '../elements/PathDisplayer.vue';
import AddFavoritesItem from '../elements/favorites/AddFavoritesItem.vue';
import FavoritesItem from '../elements/favorites/FavoritesItem.vue';
import OptionsFavoritesItem from '../elements/favorites/OptionsFavoritesItem.vue';
import FavoriteItemDotButtonModal from '../elements/modals/FavoriteItemDotButtonModal.vue';
import FavoriteRestaurantDotButtonModal from '../elements/modals/FavoriteRestaurantDotButtonModal.vue';

import { currentUserStore } from '../../stores/currentUserStore';
import { useFavoritesLists } from '../../composables/use-favorites-lists';
import { putModifyFavoritesListName } from '../../api/api-favorites';
import { getRestaurant } from '../../api/api-restaurant';

export default {
    components: {
        "restaurant-item": RestaurantItem,
        "path-displayer": PathDisplayer,
        "add-favorites-item": AddFavoritesItem,
        "favorites-item": FavoritesItem,
        "options-favorites-item": OptionsFavoritesItem,
        "favorite-item-dot-button-modal": FavoriteItemDotButtonModal,
        "favorite-restaurant-dot-button-modal": FavoriteRestaurantDotButtonModal
    },
    data() {
        return {
            currentUserStore,
            aFavoritesListOpen: false,
            currentFavoritesListOpen: {},
            showModifyNameField: false,
            modifyingName: ""
        }
    },
    setup() {
        const { favorites, loading } = useFavoritesLists(currentUserStore.id)
        return {
            favorites,
            loading
        }
    },
    methods: {
        newFavoritesListCreate: function(favorite) {
            this.favorites.push(favorite)
        },
        openFavoritesList: async function(favorite) {
            this.aFavoritesListOpen = true
            let tmp = { ...favorite }
            tmp.restaurants = []
            for (let r of favorite.restaurants) {
                tmp.restaurants.push(await getRestaurant(r.id))
            }
            this.currentFavoritesListOpen = tmp
        },
        deleteFavoritesList: function(favorite) {
            this.closeFavoritesListOpen()
            let index = this.favorites.findIndex(f => f.id === favorite.id)
            if (index !== -1) {
                this.favorites.splice(index, 1)
            }
        },
        closeFavoritesListOpen: function() {
            this.aFavoritesListOpen = false
            this.currentFavoritesListOpen = {}
        },
        removeRestaurantFromTheList(favorite, restaurant) {
            // remove from global favorites
            let currentFavorite = this.favorites.find(f => f.id === favorite.id)
            let index = currentFavorite.restaurants.findIndex(r => r.id === restaurant.id)
            if (index !== -1) {
                currentFavorite.restaurants.splice(index, 1)
            } 
            // remove from current opened copied favorite
            index = favorite.restaurants.findIndex(r => r.id === restaurant.id)
            if (index !== -1) {
                favorite.restaurants.splice(index, 1)
            }
        },
        displayModifyNameField: function() {
            this.showModifyNameField = true
            this.modifyingName = this.currentFavoritesListOpen.name
            this.$refs['modifyNameFieldInput'].focus()
        },
        hideModifyNameField: function() {
            this.showModifyNameField = false
        },
        submitNewFavoritesListName: async function() {
            if (this.modifyingName.length > 0 && this.modifyingName !== this.currentFavoritesListOpen.name) {
                await putModifyFavoritesListName(this.currentFavoritesListOpen.id, this.modifyingName, this.currentUserStore.email)
                this.currentFavoritesListOpen.name = this.modifyingName
                let currentFavorite = this.favorites.find(f => f.id === this.currentFavoritesListOpen.id)
                currentFavorite.name = this.modifyingName
                console.log(`name of favorites list #${this.currentFavoritesListOpen.id} change to ${this.modifyingName}`)
                this.hideModifyNameField()
            }
        }
    }
}
</script>