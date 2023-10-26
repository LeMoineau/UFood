<template>
    <div class="mx-4 md:mx-40 pb-6">
        <!-- Force page without any restaurants -->
        <div v-if="forceEmpty || (restaurants && restaurants.length <= 0)" class="w-full flex flex-col justify-center items-center pt-32">
            <p class="text-md"> You haven't visited any restaurant yet </p>
            <router-link to="/" class="bg-blue-400 mt-4 rounded-lg px-6 py-3 text-md text-white shadow-center-md ease-linear hover:bg-blue-300">
                To the home page
            </router-link>
        </div>

        <!-- Loading visited restaurants -->
        <div v-else-if="!forceEmpty && loading" class="flex flex-col items-center w-full mt-20">
            <p> Loading your visited restaurants... </p>
            <img src="../../assets/loading_circle.gif" alt="loading circle gif" class="w-10" />
        </div>

        <!-- Show visited restaurants -->
        <div v-else-if="!forceEmpty && !showRestaurantVisits" class="flex flex-col lg:flex-row flex-wrap justify-start items-center pt-0">
            <path-displayer :path="['My visited restaurants']"></path-displayer>
            <restaurant-item v-for="r in restaurants" :key="r.id" :restaurant="r" :nbVisit="r.nbVisits">
                <visited-restaurant-dot-button-modal :restaurant="r" @openRestaurantVisits="openRestaurantVisits"></visited-restaurant-dot-button-modal>
            </restaurant-item>
        </div>

        <!-- Show visits of a restaurant -->
        <div v-else-if="showRestaurantVisits">
            <path-displayer :path="['My visited restaurants']" @clickPath="p => {if (p === 'My visited restaurants') closeRestaurantVisits()}"
                    class="mb-10">
                <p class="font-semibold text-xl"> {{ currentlySelectedRestaurant.name }} </p>
            </path-displayer>
            <visit-item v-for="v in currentlySelectedRestaurant.visits" :key="v.id" :visit="v"></visit-item>
        </div>
    </div>
</template>

<script>
import RestaurantItem from '../elements/RestaurantItem.vue';
import PathDisplayer from '../elements/PathDisplayer.vue';
import VisitItem from '../elements/VisitItem.vue';
import VisitedRestaurantDotButtonModal from '../elements/modals/VisitedRestaurantDotButtonModal.vue';

import { currentUserStore } from '../../stores/currentUserStore';
import { useVisitedRestaurants } from '../../composables/use-visited-restaurants';
import { getUserRestaurantsVisits } from '../../api/api-user';

export default {
    props: {
        forceEmpty: Boolean
    },
    components: {
        "restaurant-item": RestaurantItem,
        "path-displayer": PathDisplayer,
        "visit-item": VisitItem,
        "visited-restaurant-dot-button-modal": VisitedRestaurantDotButtonModal
    },
    setup() {
        const { restaurants, loading } = useVisitedRestaurants(currentUserStore.id)
        return {
            restaurants,
            loading
        }
    },
    data() {
        return {
            currentUserStore,
            showRestaurantVisits: false,
            currentlySelectedRestaurant: null
        }
    },
    methods: {
        openRestaurantVisits: async function(restaurant) {
            this.showRestaurantVisits = true
            this.currentlySelectedRestaurant = restaurant
            this.currentlySelectedRestaurant.visits = (await getUserRestaurantsVisits(currentUserStore.id, restaurant.id)).items
        },
        closeRestaurantVisits: function() {
            this.showRestaurantVisits = false
        }
    }
}
</script>