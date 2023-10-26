import { ref, onMounted } from 'vue'
import { getRestaurants } from '../api/api-restaurant'

export function useRestaurants() {
    const restaurants = ref(null)

    onMounted(async () => {
        restaurants.value = await getRestaurants();
    })

    return { restaurants }
}