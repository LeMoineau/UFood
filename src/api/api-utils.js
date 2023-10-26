
import { currentUserStore } from "../stores/currentUserStore"

export const API_ENDPOINT = "https://ufoodapi.herokuapp.com"

export async function sendFetchWithCustomHeader(method, url, data, headers, errorCallback=err => console.log(err)) {
    let init = {
        method: method,
        headers: headers
    }
    if (currentUserStore.connected) {
        init.headers['Authorization'] = currentUserStore.token
    }
    if (data) {
        init.headers['Content-Type'] = 'application/json'
        init.body = JSON.stringify(data)
    }
    return await fetch(url, init)
        .then(res => {return res.json()})
        .catch(err => {
            errorCallback(err)
            throw new Error(`An error has occured during a fetch request: no access to the api (api_endpoint: ${url})`)
        })
}

export async function sendFetch(method, url, data, errorCallback) {
    return sendFetchWithCustomHeader(method, url, data, {}, errorCallback)
}

export function sendFetchWithAuthorization(method, url, data, token, errorCallback) {
    return sendFetchWithCustomHeader(method, url, data, {
        'Authorization': `${token}`
    }, errorCallback)
}

export function sendFetchGET(url, errorCallback) {
    return sendFetch('GET', url, null, errorCallback)
}

export function sendFetchPOST(url, data, errorCallback) {
    return sendFetch('POST', url, data, errorCallback)
}