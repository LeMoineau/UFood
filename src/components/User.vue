<template>
  <div>
    <!-- Page Loading -->
    <user-error-page v-if="currentUserStore.loading">
      <p class="text-base"> Page loading... </p>
     
      <img src="../assets/loading_circle.gif" alt="loading circle gif" class="w-10" />
    </user-error-page>

    <!-- User not connected -->
    <user-error-page v-else-if="!currentUserStore.connected">
      <p> Oups! You're not connected.. </p>
      <router-link to="/login">
        <cubic-button bgColor="bg-green-400" class="mt-2 text-base px-5 py-1"> Se connecter </cubic-button>
      </router-link>
    </user-error-page>

    <!-- User connected -->
    <div v-else-if="currentUserStore.connected">
      <user-header @toggleForceEmpty="empty = !empty"></user-header>
      <user-nav-bar :tabs="tabs" @selectTab="selectTab"></user-nav-bar>
      <user-visited-restaurants v-show="tabs.restaurants.isActive" :forceEmpty="empty"></user-visited-restaurants>
      <user-favorites-lists v-show="tabs.favorites.isActive"></user-favorites-lists>
      <user-followers v-show="tabs.followers.isActive"></user-followers>
      <user-following v-show="tabs.following.isActive"></user-following>
      <user-search v-show="tabs.searchUser.isActive"></user-search>
    </div>
  </div>
</template>

<script>
import CubicButton from './elements/CubicButton.vue';
import UserErrorPage from './user-elements/UserErrorPage.vue';
import UserHeader from './user-elements/UserHeader.vue';
import UserNavBar from './user-elements/UserNavBar.vue';
import UserVisitedRestaurants from './user-elements/UserVisitedRestaurants.vue';
import UserFavoritesLists from './user-elements/UserFavoritesLists.vue';
import UserFollowers from './user-elements/UserFollowers.vue';
import UserFollowing from './user-elements/UserFollowing.vue';
import UserSearch from './user-elements/UserSearch.vue';

import { currentUserStore } from '../stores/currentUserStore';

export default {
  components: {
    "cubic-button": CubicButton,
    "user-error-page": UserErrorPage,
    "user-header": UserHeader,
    "user-nav-bar": UserNavBar,
    "user-visited-restaurants": UserVisitedRestaurants,
    "user-favorites-lists": UserFavoritesLists,
    "user-followers": UserFollowers,
    "user-following": UserFollowing,
    "user-search": UserSearch
  },
  data() {
    return {
      empty: false,
      currentUserStore,
      tabs: {
        restaurants: {
          name: "Restaurants visited",
          isActive: true
        },
        favorites: {
          name: "Favorites lists",
          isActive: false
        },
        followers: {
          name: "Followers",
          isActive: false
        },
        following: {
          name: "Following",
          isActive: false
        },
        searchUser: {
          name: "Search user",
          isActive: false
        }
      }
    }
  },
  mounted() {
    if (this.$route.params.toFavorites) {
      this.selectTab("Favorites lists")
    }
  },
  methods: {
    selectTab: function(tabName) {
      for (let t in this.tabs) {
        let tab = this.tabs[t]
        tab.isActive = tab.name === tabName
      }
    }
  }
}
</script>
