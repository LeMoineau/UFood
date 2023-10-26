
import { API_ENDPOINT, sendFetchGET, sendFetchPOST } from './api-utils'
import { currentUserStore } from "../stores/currentUserStore"

async function sendFetch(method, url, data, errorCallback=err => console.log(err)) {
    let init = {
        method: method,
        headers: {}
    }
    if (currentUserStore.connected) {
        init.headers["Authorization"] = currentUserStore.token
    }
    if (data) {
        init.headers['Content-Type'] = 'application/json'
        init.body = JSON.stringify(data)
    }
    return await fetch(url, init)
        .then(res => {return res.json()})
        .catch(err => {
            errorCallback(err)
            throw new Error(`An error has occured during a fetch request: no access to the api (api_endpoint: ${API_ENDPOINT})`)
        })
}

export function getUser(userId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/users/${userId}`, errorCallback)
}

export function getUserVisitedRestaurants(userId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/users/${userId}/restaurants/visits`, errorCallback)
}

export function getUserRestaurantsVisits(userId, restaurantId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/users/${userId}/restaurants/${restaurantId}/visits`, errorCallback)
}

export async function getUserFavoritesLists(userId, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/users/${userId}/favorites`, errorCallback)
}

export function postNewRestaurantVisit(userId, restaurant_id, date, rating, comment, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/users/${userId}/restaurants/visits`, {
        restaurant_id: restaurant_id,
        date: date,
        rating: rating,
        comment: comment
    }, errorCallback)
}

export function deleteUnfollow(followerId, errorCallback) {
    return sendFetch('DELETE', `${API_ENDPOINT}/follow/${followerId}`, null, errorCallback)
}

export function getUserFromSearch(query, errorCallback) {
    return sendFetchGET(`${API_ENDPOINT}/users?q=${query}`, errorCallback)
}

export function postFollow(followId, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/follow`, {
        id: followId
    }, errorCallback)
}