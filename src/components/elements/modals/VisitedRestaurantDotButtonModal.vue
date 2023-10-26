<template>
    <div class="flex flex-col items-end">
        <router-link :to="{name: 'Restaurant', params: {restaurantId: restaurant.id}}"> More informations </router-link>
        <a class="cursor-pointer mt-2" @click="$emit('openRestaurantVisits', restaurant)"> See visits </a>
    </div>
</template>

<script>

export default {
    props: {
        restaurant: Object
    },
    emits: ['openRestaurantVisits']
}
</script>