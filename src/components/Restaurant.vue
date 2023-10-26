<template>
  <div>
    <!-- Loading visited restaurants -->
    <div v-if="loading" class="flex flex-col items-center w-full mt-20">
      <p> Loading the restaurant page... </p>
      <img src="@/assets/loading_circle.gif" alt="loading circle gif" class="w-10" />
    </div>

    <!-- User not connected -->
    <div v-if="!currentUserStore.connected" class="flex flex-col items-center w-full mt-20 text-center">
      <p> Oups! You're not connected.. <br> You need to be connected to continue surfing on UFood !</p>
      <router-link to="/login">
        <cubic-button bgColor="bg-green-400" class="mt-2 text-base px-5 py-1"> Se connecter </cubic-button>
      </router-link>
    </div>

    <!-- Restaurant Page -->
    <div v-else>
      <restaurant-header :restaurant="restaurant" 
        @addToFavoritesList="addToFavoritesList"
        @postVisit="postVisit"
        @showMorePictures="showMorePictures">
      </restaurant-header>

      <!-- Body part -->
      <div class="w-full flex flex-col justify-center items-center md:items-start md:flex-row md:justify-center pt-8">
        <!-- Location container -->
        <div class="rounded-lg shadow-center-md p-4 m-4">
          <h1 class="text-2xl font-semibold"> Localisation </h1>
          <p class="mt-4 mb-2"> {{ restaurant.address }} </p>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe :src="restaurantLocation" id="gmap_canvas" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
          </div>
          <a :href="directionFromUserToRestaurantLocation">          
            <cubic-button bgColor="bg-blue-400" textColor="text-white py-2 shadow-md mt-4"> Go to restaurant location </cubic-button>
          </a>
        </div>

        <!-- More informations container -->
        <div class="rounded-lg shadow-center-md p-4 m-4">
          <h1 class="text-2xl font-semibold"> More informations </h1>
          <p class="mt-4 mb-2"> <b> genres : </b> {{ restaurant.genres.join(', ') }} </p>
          <div class="flex flex-row">
            <p class="mr-1"> <b> Opening hours : </b> </p>
            <div>
              <p v-for="(hours, day) in restaurant.opening_hours" :key="day"> 
                <i> {{ day }} </i> 
                {{ hours }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <restaurant-suggestions :restaurant="restaurant" v-if="currentUserStore.connected"></restaurant-suggestions>

    <!-- Modals -->
    <more-pictures-modal :show="showFlags.showMorePictures" :restaurant="restaurant" @close="showFlags.showMorePictures = false"></more-pictures-modal>
    <adding-to-favorites-list-modal :show="showFlags.addToFavoritesList" :restaurant="restaurant" @close="showFlags.addToFavoritesList = false"></adding-to-favorites-list-modal>
    <restaurant-visit-modal :show="showFlags.postAVisit" :restaurant="restaurant" @close="showFlags.postAVisit = false"></restaurant-visit-modal>
  </div>
</template>

<script>
import RestaurantHeader from './restaurant-elements/RestaurantHeader.vue';
import CubicButton from './elements/CubicButton.vue';
import MorePicturesModal from './elements/modals/MorePicturesModal.vue';
import AddingToFavoritesListModal from './elements/modals/AddingToFavoritesListModal.vue';
import RestaurantVisitModal from './elements/modals/RestaurantVisitModal.vue';
import RestaurantSuggestions from './restaurant-elements/RestaurantSuggestions.vue';

import { getRestaurant } from '../api/api-restaurant';
import { getUserLocation } from '../api/api-geolocation';
import { currentUserStore } from '../stores/currentUserStore';

export default {
  components: {
    "restaurant-header": RestaurantHeader,
    "cubic-button": CubicButton,
    "more-pictures-modal": MorePicturesModal,
    "adding-to-favorites-list-modal": AddingToFavoritesListModal,
    "restaurant-visit-modal": RestaurantVisitModal,
    "restaurant-suggestions": RestaurantSuggestions,
  },
  data() {
    return {
      loading: true,
      restaurant: null,
      showFlags: {
        addToFavoritesList: false,
        postAVisit: false,
        showMorePictures: false
      },
      userLocation: null,
      currentUserStore
    }
  },
  async created() {
    // get restaurant data
    let restaurantId = this.$route.params.restaurantId
    if (restaurantId) {
      this.restaurant = await getRestaurant(restaurantId)
    } else {
      this.$router.push("/")
    }
    this.loading = false

    // get user location
    getUserLocation(pos => {
      this.userLocation = pos
    })
  },
  methods: {
    addToFavoritesList: function() {
      this.showFlags.addToFavoritesList = true
    },
    postVisit: function() {
      this.showFlags.postAVisit = true
    },
    showMorePictures: function() {
      this.showFlags.showMorePictures = true
    }
  },
  computed: {
    restaurantLocation() {
      let lat = this.restaurant.location.coordinates[1]
      let lon = this.restaurant.location.coordinates[0]
      return `https://maps.google.com/maps?q=${lat},${lon}&ie=UTF8&iwloc=&output=embed`
    },
    directionFromUserToRestaurantLocation() {
      if (!this.userLocation) {
        return ''
      }
      let restoLat = this.restaurant.location.coordinates[1]
      let restoLon = this.restaurant.location.coordinates[0]
      let userLat = this.userLocation.coords.latitude
      let userLon = this.userLocation.coords.longitude
      return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${restoLat},${restoLon}&travelmode=driving`; 
    }
  }
}
</script>