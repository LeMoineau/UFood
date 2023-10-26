
import { API_ENDPOINT, sendFetchGET } from "./api-utils"

export function getRestaurantsWithOptions(options, errorCallback) {
    let query = []
    if (options.page) query.push(`page=${options.page}`)
    if (options.q && options.q.length > 0) query.push(`q=${options.q}`)
    if (options.genres && options.genres.length > 0) query.push(`genres=${options.genres.join(',')}`)
    if (options.priceRange && options.priceRange.length > 0) query.push(`price_range=${options.priceRange.join(',')}`)
    if (options.location) query.push(`lat=${options.location.latitude}&lon=${options.location.longitude}`)
    return sendFetchGET(`${API_ENDPOINT}/restaurants?${query.join('&')}`, errorCallback)
}

export function getRestaurants(errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/restaurants`, errorCallback)
}

export function getRestaurant(restaurantId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/restaurants/${restaurantId}`, errorCallback)
}

export function getRestaurantVisits(restaurantId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/restaurants/${restaurantId}/visits`, errorCallback)
}