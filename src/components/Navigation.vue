<template>
  <nav class="sticky top-0 h-auto md:h-16 bg-light-grey py-4 md:py-0 shadow-md z-30">
    <!-- Global Header -->
    <div class="h-full w-full flex flex-row justify-between items-center px-6">
      <router-link class="text-lg font-medium" to="/">
        UFood
      </router-link>
      <search-bar v-if="!currentlyInHome" 
        @pressEnter="makeSearch" 
        @updateSearch="s => search = s" 
        :setSearchValue="search"
        class="hidden md:block">
      </search-bar>
      <navigation-user-bubble v-if="currentUserStore.connected"> </navigation-user-bubble>
      <div v-else class="flex flex-row items-center">
        <router-link to="/login">
          <cubic-button bg-color="bg-blue-400"> Se connecter </cubic-button>
        </router-link>
        <router-link to="/signup">
          <cubic-button bg-color="bg-red-400" class="ml-2"> Créer un compte </cubic-button>
        </router-link>
      </div>
    </div>

    <!-- Additionnal Search Bar for small screen  -->
    <search-bar v-if="!currentlyInHome" 
      @pressEnter="makeSearch" 
      @updateSearch="s => search = s" 
      :setSearchValue="search"
      custom-class="w-full"
      class="block md:hidden px-4 pt-4">
    </search-bar>
  </nav>
</template>

<script>
import SearchBar from "./elements/SearchBar.vue";
import CubicButton from "./elements/CubicButton.vue";
import NavigationUserBubble from "./navigation-elements/NavigationUserBubble.vue";

import { currentUserStore } from "../stores/currentUserStore";

export default {
  components: {
    "search-bar": SearchBar,
    "cubic-button": CubicButton,
    "navigation-user-bubble": NavigationUserBubble
  },
  props: {
    currentlyInHome: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      currentUserStore,
      search: ""
    }
  },
  created() {
    currentUserStore.loginWithToken()
  },
  methods: {
    makeSearch: function(search) {
      if (search.length > 0) {
        this.$router.push({
          name: 'Home',
          params: {
            search: search
          }
        })
      }
    }
  }
}
</script>
