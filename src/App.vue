<template>
  <div id="app">
    <nav-menu :currentlyInHome="$route.name === 'Home'"></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
};
</script>

<style></style>
