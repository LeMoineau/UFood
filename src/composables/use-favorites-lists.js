import { ref, onMounted, isRef } from 'vue'
import { getUserFavoritesLists } from '../api/api-user'

export function useFavoritesLists(userId) {
    const favorites = ref(null)
    const loading = ref(true)

    async function doFavoritesLists() {
        if (userId) {
            favorites.value = (await getUserFavoritesLists(userId)).items
            loading.value = false
        }
    }

    onMounted(() => {
        favorites.value = []
    })

    if (isRef(userId)) {
        watchEffect(doFavoritesLists)
    } else {
        doFavoritesLists()
    }

    return { favorites, loading }
}