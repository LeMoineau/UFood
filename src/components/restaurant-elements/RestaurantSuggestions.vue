<template>
    <div class="flex flex-col w-full mt-6 pb-6">
        <h1 class="text-2xl font-semibold px-4 md:px-40"> Restaurants you might also like  </h1>
        <div class="flex flex-row flex-wrap justify-center items-center width-full px-4">
            <restaurant-item v-for="r in suggestions" :key="r.id" :restaurant="r"></restaurant-item>
        </div>
    </div>
</template>

<script>
import RestaurantItem from '../elements/RestaurantItem.vue';

import { getRestaurantsWithOptions } from '../../api/api-restaurant';

export default {
    components: {
        "restaurant-item": RestaurantItem
    },
    props: {
        restaurant: {
            required: true
        }
    },
    data() {
        return {
            suggestions: []
        }
    },
    watch: {
        restaurant() {
            this.initSuggestions()
        }
    },
    methods: {
        initSuggestions: async function() {
            this.suggestions = (await getRestaurantsWithOptions({
                genres: this.restaurant.genres,
                price_range: this.restaurant.price_range
            })).items;
        }
    }
}
</script>