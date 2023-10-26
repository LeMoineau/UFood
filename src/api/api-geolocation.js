
export async function getUserLocation(errorCallback=err => console.log(err)) {
    // check navigator geolocalisation api
    if(!("geolocation" in navigator)) {
        throw new Error('browser does not support geolocation or user refuses to give access')
    }
    
    // get user location
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
            resolve(pos)
        }, err => {
            reject(err)
            throw new Error(`User refuses access to his location (${err.message})`)
        })
    }).then(pos => {
        return pos
    }).catch(err => errorCallback(err))
}