
import { API_ENDPOINT, sendFetchGET, sendFetchPOST, sendFetch } from "./api-utils"

export function getFavoritesList(favoritesId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/favorites/${favoritesId}`, errorCallback)
}

export function postNewFavoritesList(userMail, favoritesListName, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/favorites`, {
        name: `${favoritesListName}`,
        owner: `${userMail}`
    }, errorCallback)
}

export function postAddRestaurantToFavoritesList(favoriteId, restaurant_id, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/favorites/${favoriteId}/restaurants`, {
        id: restaurant_id
    }, errorCallback)
}

export function deleteFavoritesList(favoriteId, errorCallback) {
    return sendFetch('DELETE', `${API_ENDPOINT}/favorites/${favoriteId}`, null, errorCallback)
}

export function deleteRemoveRestaurantFromList(favoriteId, restaurantId, errorCallback) {
    return sendFetch('DELETE', `${API_ENDPOINT}/favorites/${favoriteId}/restaurants/${restaurantId}`, null, errorCallback)
}

export function putModifyFavoritesListName(favoriteId, newFavoriteName, userMail, errorCallback) {
    return sendFetch('PUT', `${API_ENDPOINT}/favorites/${favoriteId}`, {
        name: newFavoriteName,
        owner: userMail
    }, errorCallback)
}