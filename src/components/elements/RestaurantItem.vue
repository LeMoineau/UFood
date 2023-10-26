<template>
    <div v-if="restaurant" class="w-full lg:w-auto transform mt-6 lg:mx-4">
        <div @click="toRestaurantPage" class="cursor-pointer w-full lg:w-80 min-h-120px h-auto lg:h-96 shadow-center-md rounded-md flex flex-row lg:flex-col justify-start items-center">
            <div class="w-1/5 h-full min-h-120px lg:h-64 lg:w-full bg-cover min-w-120px bg-center rounded-tl-md rounded-bl-md lg:rounded-bl-none lg:rounded-tr-md" 
                :style="`background-image: url(${restaurant.pictures[0]})`" ref="restaurantImage">
            </div>
                
            <div class="w-full h-full box-border pl-4 py-4 lg:h-auto flex flex-col justify-center items-start lg:relative"
                ref="restaurantInfosContainer">
                <h2 class="font-semibold text-xl mb-2 lg:mt-2"> {{ restaurant.name }} </h2>
                <p> address: {{ restaurant.address }} </p>
                <p> genres: {{ restaurant.genres.join(', ') }} </p>
                <p> price range: {{ restaurant.price_range }} </p>
                <p class="text-sm"> {{ restaurant.adress }} </p>
                <div v-if="nbVisit !== undefined" 
                    class="lg:absolute bg-gray-100 px-4 py-2 rounded-full shadow-center-md lg:top-0 right-4 lg:right-2 
                    lg:transform mt-4 lg:mt-0 lg:-translate-y-3/4 text-sm">
                    {{ nbVisit > 1 ? `Visited ${nbVisit} times` : `Visited only ${nbVisit} times` }}
                </div>
            </div>
        </div>
        
        <dot-button class="absolute top-0 right-0 mt-2 mr-2 z-10">
            <slot></slot>
        </dot-button>
    </div>
</template>

<script>
import DotButton from './DotButton.vue';

export default {
    components:{
        "dot-button": DotButton,
    },
    props: {
        restaurant: {
            required: false,
            default: undefined
        },
        nbVisit: {
            type: Number,
            required: false,
            default: undefined
        }
    },
    updated() {
        if (this.restaurant) {
            let container = this.$refs.restaurantInfosContainer
            let image = this.$refs.restaurantImage

            const resizeObserver = new ResizeObserver(() => {
                if (window.innerWidth < 1024) {
                    image.style["height"] = `${container.clientHeight}px`
                } else {
                    image.style["height"] = ``
                }
            });

            resizeObserver.observe(container);
        }
    },
    methods: {
        toRestaurantPage: async function() {
            const needReload = this.$route.name === "Restaurant"
            await this.$router.push({ 
                name: 'Restaurant', 
                params: { 
                    restaurantId: this.restaurant.id 
                },
            })
            if (needReload){ 
                this.$router.go()
                window.scrollTo(0,0)
            }
        }
    }
};
</script>