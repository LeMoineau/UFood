
<template>
  <div class="flex flex-col-reverse md:flex-row w-full h-screen-header">
    <div class="flex flex-row w-full transform md:h-full" :class="mapOpened ? 'h-1/2 md:w-1/3 md:min-w-350px' : 'h-full md:w-full'">
      <!-- Filters side -->
      <filter-panel 
        :filters="filters" 
        :filterPanelOpen="filterPanelOpen"
        @toggleFilterPanelOpen="(state) => filterPanelOpen = state"
        @applyFilters="applyFilters"
        @resetAllFilters="resetAllFilters"
        :forceHideButtonShow="filterPanelOpen && mapOpened"
        :class="filterPanelOpen ? (mapOpened ? 'md:fixed md:top-0 md:left-0 md:h-screen-header md:w-full' : '') : 'md:hidden'">
      </filter-panel>

      <!-- Restaurant Items side -->
      <restaurant-list
        :restaurants="restaurants"
        :filters="filters" 
        :filterPanelOpen="filterPanelOpen"
        :errorMessage="errorMessage"
        @toggleFilterPanelOpen="(state) => filterPanelOpen = state"
        @makeSearch="makeSearch"
        @loadMoreRestaurants="loadMoreRestaurants"
        :forceFilterButtonShow="mapOpened">
      </restaurant-list>
    
      <!-- Boutons d'affichage de la carte -->
      <div
        @click="toggleMap"
        class="md:hidden fixed top-0 left-1/2 transform -translate-x-1/2 bg-white px-7 py-3 cursor-pointer shadow-center-md rounded-b-md">
        {{ mapOpened ? '︿ hide map ︿' : '﹀ show map ﹀' }}
      </div>
      <div
        @click="toggleMap"
        class="hidden md:block fixed top-1/2 right-0 transform rotate-z-180 bg-white px-7 py-3 cursor-pointer shadow-center-md rounded-l-full">
        {{ mapOpened ? 'hide map >' : '< show map' }}
      </div>
    </div>
    
    <!-- Map -->
    <map-vue
      ref="map"
      :userLocation="filters.location"
      :restaurants="restaurants"
      class="h-1/2 w-full md:h-full"
      :class="mapOpened ? '' : 'hidden'">
    </map-vue>
  </div>
</template>

<script>
import RestaurantList from './home-elements/RestaurantList.vue';
import FilterPanel from './home-elements/FilterPanel.vue';
import MapVue from './home-elements/Map.vue';

import { getRestaurantsWithOptions } from '../api/api-restaurant';
import { getUserLocation } from '../api/api-geolocation';
import { currentUserStore } from '../stores/currentUserStore';

export default {
  components: {
    "restaurant-list": RestaurantList,
    "filter-panel": FilterPanel,
    "map-vue": MapVue,
  },
  data() {
    return {
      filterPanelOpen: false,
      restaurants: [],
      filters: {
        page: 0,
        q: "",
        genres: [],
        priceRange: [],
        useUserLocation: true,
        location: undefined
      },
      errorMessage: "",
      mapOpened: true,
      currentUserStore
    }
  },
  async created() {
    let initSearch = this.$route.params.search

    // When coming from other page with research in navigation bar
    if (initSearch) {
      this.filters.q = initSearch
      this.$route.params.search = undefined
    }

    if (this.mapOpened) {
      await this.getUserPosition()
    }

    // Initiale restaurants loading
    this.restaurants = (await getRestaurantsWithOptions(this.filters)).items
  },
  methods: {
    loadMoreRestaurants: async function() {
      this.filters.page += 1
      let restaurants = (await getRestaurantsWithOptions(this.filters)).items
      if (restaurants.length <= 0) {
        this.errorMessage = "No more result..."
      } else {
        for (let r of restaurants) {
          this.restaurants.push(r)
        }
        this.reloadMap()
      }
    },
    applyFilters: async function() {
      this.resetBasicsFilters()
      if (!this.filters.useUserLocation) this.filters.location = undefined
      else if (this.filters.useUserLocation && !this.filters.location) await this.getUserPosition()
      this.getRestaurantsWithOptions()
    },
    makeSearch: async function(search) {
      this.resetBasicsFilters()
      this.filters.q = search
      this.restaurants = (await getRestaurantsWithOptions(
          {
            q: search  
          })
        ).items
    },
    getRestaurantsWithOptions: async function() {
      let search = this.filters.q
      this.filters.q = ""
      this.restaurants = (await getRestaurantsWithOptions(this.filters)).items
      this.filters.q = search
      this.reloadMap()
    },
    resetAllFilters: async function() {
      this.resetBasicsFilters()
      this.filters.genres = []
      this.filters.priceRange = []
      this.filters.useUserLocation = false
      this.filters.location = undefined
      this.filters.q = ""
      this.getRestaurantsWithOptions()
    },
    resetBasicsFilters: function() {
      this.filters.page = 0
      this.errorMessage = ""
    },
    toggleMap: function() {
      this.mapOpened = !this.mapOpened
      if (!this.mapOpened) {
        this.filterPanelOpen = true;
      } else {
        this.filterPanelOpen = false;
      }
    },
    getUserPosition: async function() {
      let pos = await getUserLocation()
      this.filters.location = pos.coords
    },
    reloadMap: function() {
      if (this.mapOpened) {
        this.$refs.map.loadMap()
      }
    }
  }
}
</script>

<style>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #9E9E9E;
  margin: 1em 0;
  padding: 0;
}
</style>
