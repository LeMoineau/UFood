<template>
    <div class="flex flex-col">
        <div v-if="restaurant" class="relative flex flex-row w-full justify-start flex-wrap md:flex-nowrap bg-gray-200 pb-10 md:pt-16 px-0 md:pl-40">
            <div :style="{'background-image': `url(${restaurant.pictures[0]})`}" class="w-full bg-center bg-cover bg-no-repeat md:w-96 h-64"> </div>
            <div class="ml-4 mt-4 md:mt-0">
                <h1 class="text-3xl font-semibold"> {{ restaurant.name }} </h1>
                <div class="flex flex-row items-center">
                    <p class="text-2xl"> {{ prettyRestaurantRating }} </p>
                    <p class="ml-2"> ({{restaurant.rating.toFixed(2)}}) </p>
                </div>
                <p class="text-lg"> {{ restaurant.address }} </p>
                <p class="text-lg"> {{ restaurant.tel }} </p>
                <p class="text-xl bg-white px-4 py-2 mt-4 rounded-lg shadow-sm w-min whitespace-nowrap"> Price Range : {{ restaurant.price_range }} </p>
            </div>
        </div>
        <div v-if="currentUserStore.connected" class="w-full bg-gray-200 pb-8 flex flex-col justify-center items-center sm:flex-row sm:justify-start flex-wrap px-4 md:px-40">
            <div @click="$emit('addToFavoritesList')" class="ui labeled button" style="margin-top: 8px">
                <div class="ui red button" style="border-radius: 3px;">
                    <i class="heart icon"></i> Add to favorites
                </div>
            </div>
            <div @click="$emit('postVisit')" class="ui labeled button" style="margin-top: 8px">
                <div class="ui yellow button">
                    <i class="plus icon"></i> Mark as Visited
                </div>
                <a v-if="totalVisits >= 0" class="ui basic yellow left pointing label"> already {{totalVisits}} visits </a>
            </div>
            <div @click="$emit('showMorePictures')" class="ui labeled button" style="margin-top: 8px">
                <div class="ui green button">
                    <i class="image icon"></i> More Pictures...
                </div>
                <a class="ui basic green left pointing label"> {{restaurant.pictures.length}} more pictures </a>
            </div>
        </div>
    </div>
</template>

<script>
import { getRestaurantVisits } from '../../api/api-restaurant';
import { currentUserStore } from '../../stores/currentUserStore';

export default {
    props: {
        restaurant: Object
    },
    emits: ['addToFavoritesList', 'postVisit', 'showMorePictures'],
    data() {
        return {
            currentUserStore,
            totalVisits: -1
        }
    },
    async created() {
        this.totalVisits = (await getRestaurantVisits(this.restaurant.id)).total
    },
    computed: {
        prettyRestaurantRating() {
            let ratingStr = ""
            for (let i = 1; i<this.restaurant.rating; i++) {
                ratingStr += "⭐"
            }
            return ratingStr
        }
    },
}
</script>