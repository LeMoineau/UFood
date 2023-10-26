import { ref, onMounted, isRef } from 'vue'
import { getRestaurant } from '../api/api-restaurant'
import { getUserRestaurantsVisits, getUserVisitedRestaurants } from '../api/api-user'

export function useVisitedRestaurants(userId) {
    const restaurants = ref(null)
    const loading = ref(true)

    async function doVisitedRestaurants() {
        if (userId) {
            let userVisits = (await getUserVisitedRestaurants(userId)).items
            for (let v of userVisits) {
                if (!restaurants.value.find(r => r.id === v.restaurant_id)) {
                    let restaurantVisits = (await getUserRestaurantsVisits(userId, v.restaurant_id)).items
                    let restaurant = await getRestaurant(v.restaurant_id)
                    restaurant.visits = restaurantVisits
                    restaurant.nbVisits = restaurantVisits.length
                    restaurants.value.push(restaurant)
                }
            }
            loading.value = false
        }
    }

    onMounted(() => {
        restaurants.value = []
    })

    if (isRef(userId)) {
        watchEffect(doVisitedRestaurants)
    } else {
        doVisitedRestaurants()
    }

    return { restaurants, loading }
}