<template>
  <div class="transform">
    <!-- Map -->
    <div id="map" class="w-full h-full" :class="!userLocation ? 'hidden' : (loading ? 'hidden' : '')"></div>

    <!-- Allow user geolocation -->
    <div v-if="!loading && !userLocation" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
      <p> You need to allow giving your location to use the map... </p>
    </div>

    <!-- Loading map -->
    <div v-if="loading && userLocation" class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
      <p> Loading the restaurant page... </p>
      <img src="@/assets/loading_circle.gif" alt="loading circle gif" class="w-10" />
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";

export default {
  props: {
    userLocation: {
      required: true
    },
    restaurants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      map: undefined
    };
  },
  watch: {
    userLocation() {
      this.loadMap()
    },
    restaurants() {
      this.loadMap()
    }
  },
  methods: {
    loadMap: function() {
      if (!this.userLocation) return;

      this.loading = true;
      const center = [this.userLocation.latitude, this.userLocation.longitude]
     
      if (!this.map) {
        this.map = leaflet.map('map').setView(center, 13);
      } else {
        this.map.remove()
        this.map = leaflet.map('map').setView(center, 13);
      } 
      
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.createUserMarker()

      for (let r of this.restaurants) {
        this.createRestaurantMarker(r)
      }

      this.loading = false;
    },
    createRestaurantMarker: function(restaurant) {
      L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]])
        .addTo(this.map)
        .bindPopup(`<b>${restaurant.name}</b> <br> ${restaurant.address}`)
    },
    createUserMarker: function() {
      const lat = this.userLocation.latitude
      const lon = this.userLocation.longitude
      let marker = L.marker([lat, lon])
        .addTo(this.map)
      marker._icon.classList.add("huechange");
      marker.bindPopup(`<b> You </b> <br> ${lat}, ${lon}`)
    }
  }
};
</script>

<style>
  img.huechange { filter: hue-rotate(120deg); }
</style>