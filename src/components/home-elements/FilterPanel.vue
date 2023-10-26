<template>
    <div class="absolute md:static md:mt-0 top-0 w-screen h-screen-header md:w-auto bg-gray-300 md:h-auto box-border min-w-300px px-10 shadow-right-md z-10 overflow-auto pb-5" 
      v-if="filterPanelOpen">

      <button style="background-image: url(https://cdn-icons-png.flaticon.com/128/2976/2976286.png)"
          class="absolute top-4 right-2 w-12 h-12 bg-20px bg-no-repeat bg-center ml-4 transition ease-linear delay-50"
          :class="forceHideButtonShow ? 'block' : 'md:hidden'"
          @click="$emit('toggleFilterPanelOpen', !filterPanelOpen)"></button>

      <div class="mt-10">
        <span class="ml-2">Filters</span>
        <hr class="mt-2 ml-2 mr-2">
      </div>

      <!-- Restaurant category dropdown -->
      <div class="mt-10">
        <span class="ml-2">Category/Genre</span>
        <hr class="mt-2 ml-2 mr-2">

        <div class="grid grid-rows-3 gap-1 ml-4 mt-6">
          <div>
            <input v-model="filtersModel.genres" type="checkbox" name="genres" value="ambiance" @change="applyFilters">
            <label for="ambiance">Ambiance</label>
          </div>
          <div>
            <input v-model="filtersModel.genres" type="checkbox" name="genres" value="bistro" @change="applyFilters">
            <label for="bistro">Bistro</label>
          </div>
          <div>
            <input v-model="filtersModel.genres" type="checkbox" name="genres" value="fast-food" @change="applyFilters">
            <label for="fast-food">Fast-food</label>
          </div>
        </div>
      </div>

      <!-- Prix dropdown -->
      <div class="mt-10">
        <span class="ml-2">Price range</span>
        <hr class="mt-2 ml-2 mr-2">

        <div class="grid grid-rows-3 gap-1 ml-4 mt-6">
          <div>
            <input v-model="filtersModel.priceRange" type="checkbox" name="priceRange" value="1" @change="applyFilters">
            <label for="1">Very low</label>
          </div>
          <div>
            <input v-model="filtersModel.priceRange" type="checkbox" name="priceRange" value="2" @change="applyFilters">
            <label for="2">low</label>
          </div>
          <div>
            <input v-model="filtersModel.priceRange" type="checkbox" name="priceRange" value="3" @change="applyFilters">
            <label for="3">Medium</label>
          </div>
          <div>
            <input v-model="filtersModel.priceRange" type="checkbox" name="priceRange" value="4" @change="applyFilters">
            <label for="4">High</label>
          </div>
          <div>
            <input v-model="filtersModel.priceRange" type="checkbox" name="priceRange" value="5" @change="applyFilters">
            <label for="5">Very high</label>
          </div>
        </div>
      </div>

      <!-- Prix dropdown -->
      <div class="mt-10">
        <span class="ml-2">User location</span>
        <hr class="mt-2 ml-2 mr-2">

        <div class="grid grid-rows-3 gap-1 ml-4 mt-6">
          <div>
            <input v-model="filtersModel.useUserLocation" type="checkbox" name="priceRange" value="1" @change="applyFilters">
            <label for="1">Use user location</label>
          </div>
        </div>
      </div>

      <cubic-button bgColor="bg-white" textColor="text-black" class="px-7 py-3 text-md mt-4" @click="resetAllFilters"> 
          Reset filters 
        </cubic-button>
    </div> 
</template>

<script>
import CubicButton from '../elements/CubicButton.vue';

export default {
    components: {
        "cubic-button": CubicButton
    },
    props: {
        filterPanelOpen: {
            type: Boolean,
            required: true
        },
        filters: {
            type: Object,
            required: true
        },
        forceHideButtonShow: {
          type: Boolean,
          required: false,
          default: false
        }
    },
    emits: ['toggleFilterPanelOpen', 'applyFilters', 'resetAllFilters'],
    computed: {
        filtersModel: {
            get () { return this.filters },
            set (value) { this.$emit('update:filters', value); },
        },
    },
    methods: {
        applyFilters: function () {
            this.$emit('applyFilters')
        },
        resetAllFilters: function () {
            this.$emit('resetAllFilters')
        }
    }
}
</script>