
import { API_ENDPOINT, sendFetchPOST, sendFetchWithAuthorization } from "./api-utils";

export function postLogin(email, password, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/login`, {
        email: email,
        password: password
    }, errorCallback)
}

export async function getTokenInfo(token, errorCallback) {
    let res = await sendFetchWithAuthorization('GET', `${API_ENDPOINT}/tokenInfo`, null, token, errorCallback)
    return res.errorCode === undefined ? res : undefined
}

export function postSignUp(name, email, password, errorCallback) {
    return sendFetchPOST(`${API_ENDPOINT}/signup`, {
        name: name,
        email: email,
        password: password
    }, errorCallback)
}