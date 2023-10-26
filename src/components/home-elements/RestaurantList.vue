<template>
    <div class="h-full w-full bg-white overflow-auto">
      <slot></slot>
      
      <div class="flex flex-row w-full justify-center items-center bg-gray-200 py-16">
        <search-bar 
          :setSearchValue="filters.q" 
          @pressEnter="search => makeSearch(search)">
        </search-bar>
        <button style="background-image: url(https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/filters-icon.png)"
          class="w-12 h-12 bg-25px bg-no-repeat bg-center rounded-md shadow-center-md ml-4 bg-gray-100 hover:bg-gray-200 transition ease-linear delay-50"
          :class="forceFilterButtonShow ? 'block' : 'md:hidden'"
          @click="$emit('toggleFilterPanelOpen', !filterPanelOpen)"> 
        </button>
      </div>
  
      <div class="flex flex-col lg:flex-row justify-center flex-wrap pt-4 px-4 pb-6">
        <restaurant-item v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant">
          <home-dot-button-modal :restaurant="restaurant"></home-dot-button-modal>
        </restaurant-item>
      </div>

      <div class="flex flex-col justify-center items-center my-6">
        <cubic-button bgColor="bg-white" textColor="text-black" class="px-7 py-3 text-md" @click="loadMoreRestaurants"> 
          Load more restaurants 
        </cubic-button>
        <p class="mt-2">
          {{ errorMessage }}
        </p>
      </div>
    </div>
</template>

<script>
import SearchBar from '../elements/SearchBar.vue';
import RestaurantItem from '../elements/RestaurantItem.vue';
import HomeDotButtonModal from '../elements/modals/HomeDotButtonModal.vue';
import CubicButton from '../elements/CubicButton.vue';

export default {
    components: {
        "search-bar": SearchBar,
        "restaurant-item": RestaurantItem,
        "home-dot-button-modal": HomeDotButtonModal,
        "cubic-button": CubicButton
    },
    props: {
        filterPanelOpen: {
            type: Boolean,
            required: true
        },
        restaurants: {
            type: Array,
            required: true
        },
        filters: {
            type: Object,
            required: true
        },
        errorMessage: {
            type: String,
            required: true
        },
        forceFilterButtonShow: {
          type: Boolean,
          required: false,
          default: false
        }
    },
    emits: ['toggleFilterPanelOpen', 'makeSearch', 'loadMoreRestaurants'],
    methods: {
        makeSearch: function(search) {
            this.$emit('makeSearch', search)
        },
        loadMoreRestaurants: function() {
            this.$emit('loadMoreRestaurants')
        }
    }
}
</script>